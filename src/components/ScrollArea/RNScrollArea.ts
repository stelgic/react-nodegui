import { QScrollArea, QWidget, QScrollAreaSignals, ScrollBarPolicy } from "@nodegui/nodegui";
import { ViewProps, setViewProps } from "../View/RNView";
import { RNWidget } from "../config";

export interface ScrollAreaProps extends ViewProps<QScrollAreaSignals> {
  widgetResizable?: boolean;
  horizontalScrollBarPolicy?: ScrollBarPolicy;
  verticalScrollBarPolicy?: ScrollBarPolicy;
}

const setScrollAreaProps = (
  widget: RNScrollArea,
  newProps: ScrollAreaProps,
  oldProps: ScrollAreaProps
) => {
  const setter: ScrollAreaProps = {
    set widgetResizable(resizable: boolean) {
      widget.setWidgetResizable(resizable);
    },
    set horizontalScrollBarPolicy(policy: ScrollBarPolicy) {
      widget.setHorizontalScrollBarPolicy(policy);
    },
    set verticalScrollBarPolicy(policy: ScrollBarPolicy) {
      widget.setVerticalScrollBarPolicy(policy);
    }
  };
  Object.assign(setter, newProps);
  setViewProps(widget, newProps, oldProps);
};

/**
 * @ignore
 */
export class RNScrollArea extends QScrollArea implements RNWidget {
  setProps(newProps: ScrollAreaProps, oldProps: ScrollAreaProps): void {
    setScrollAreaProps(this, newProps, oldProps);
  }
  removeChild(child: QWidget<any>): void {
    const removedChild = this.takeWidget();
    if (removedChild) {
      removedChild.close();
    }
    child.close();
  }
  appendInitialChild(child: QWidget<any>): void {
    if (this.widget()) {
      console.warn("ScrollView can't have more than one child node");
      return;
    }
    this.setWidget(child);
  }
  appendChild(child: QWidget<any>): void {
    this.appendInitialChild(child);
  }
  insertBefore(child: QWidget<any>, beforeChild: QWidget<any>): void {
    this.appendInitialChild(child);
  }
  static tagName = "scrollarea";
}
