import {
  QWidget,
  QWebChannel,
  QWebEngineView,
  QWebEngineViewSignals
} from "@nodegui/nodegui";
import { setViewProps, ViewProps } from "../View/RNView";
import { throwUnsupported } from "../../utils/helpers";
import { RNWidget } from "../config";

export interface WebViewProps extends ViewProps<QWebEngineViewSignals> {
  channel?: QWebChannel;
  url?: string;
  html?: string;
  style?: string;
  styleSheet?: string;
}

const setWebViewProps = (
  webview: RNWebView,
  newProps: WebViewProps,
  oldProps: WebViewProps
) => {
  const setter: WebViewProps = {
    set channel(channel: QWebChannel) {
      webview.page().setWebChannel(channel);
      console.log("webchannel was set");
    },
    set url(url: string) {
      webview.load(url);

      webview.addEventListener("urlChanged", (url: string) => {
        console.log("changed to", url);
      });
      webview.addEventListener("selectionChanged", () => {
        console.log("selection", webview.property("selectedText").toString());
      });
      webview.addEventListener("loadFinished", () => {
        const js = `const loaded = true;`;
        const page = webview.page();
        page.runJavaScript(js);
      });
    },
    set html(html: string) {
      webview.setHtml(html);
    },
    set style(style: string) {
      webview.setInlineStyle(style);
    },
    set styleSheet(styleSheet: string) {
      webview.setStyleSheet(styleSheet);
    },
  };
  Object.assign(setter, newProps);
  setViewProps(webview, newProps, oldProps);
};

/**
 * @ignore
 */
export class RNWebView extends QWebEngineView implements RNWidget {
  setProps(newProps: WebViewProps, oldProps: WebViewProps): void {
    setWebViewProps(this, newProps, oldProps);
  }
  removeChild(child: QWidget<any>) {
    throwUnsupported(this);
  }
  appendInitialChild(child: QWidget<any> | QWebChannel): void {
    if (child instanceof QWebChannel) {
      if (!this.page().webChannel()) {
        this.page().setWebChannel(child);
      } else {
        console.warn("WebView can't have more than one webChannel.");
      }
      return;
    } else {
      throwUnsupported(this);
    }
  }
  appendChild(child: QWidget<any>): void {
    this.appendInitialChild(child);
  }
  insertBefore(child: QWidget<any>, beforeChild: QWidget<any>): void {
    this.appendInitialChild(child);
  }
  static tagName = "webview";
}
