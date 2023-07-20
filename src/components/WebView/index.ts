import { registerComponent, ComponentConfig } from "../config";
import { Fiber } from "react-reconciler";
import { WebViewProps, RNWebView } from "./RNWebView";
import { AppContainer } from "../../reconciler";

class WebViewConfig extends ComponentConfig {
  tagName = RNWebView.tagName;
  shouldSetTextContent(nextProps: WebViewProps): boolean {
    return false;
  }
  createInstance(
    newProps: WebViewProps,
    rootInstance: AppContainer,
    context: any,
    workInProgress: Fiber
  ): RNWebView {
    const widget = new RNWebView();
    widget.setProps(newProps, {});
    return widget;
  }
  finalizeInitialChildren(
    instance: RNWebView,
    newProps: WebViewProps,
    rootContainerInstance: AppContainer,
    context: any
  ): boolean {
    return true;
  }
  commitMount(
    instance: RNWebView,
    newProps: WebViewProps,
    internalInstanceHandle: any
  ): void {
    if (newProps.visible !== false) {
      instance.show();
    }
    return;
  }
  commitUpdate(
    instance: RNWebView,
    updatePayload: any,
    oldProps: WebViewProps,
    newProps: WebViewProps,
    finishedWork: Fiber
  ): void {
    instance.setProps(newProps, oldProps);
  }
}

export const WebView = registerComponent<WebViewProps>(new WebViewConfig());
