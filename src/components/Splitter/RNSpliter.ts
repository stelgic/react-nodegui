import {
  QWidget,
  QSplitter,
  Orientation,
  QWheelEvent,
  QSplitterSignals,
  QLayout,
  QBoxLayout,
  QGridLayout
} from "@nodegui/nodegui";
import { setViewProps, ViewProps, SizePolicy } from "../View/RNView";
import { throwUnsupported } from "../../utils/helpers";
import { RNWidget } from "../config";

export type Stretch = {
  index: number;
  stretch: number;
}

export interface SplitterProps extends ViewProps<QSplitterSignals> {
  sizePolicy?: SizePolicy;
  orientation?: Orientation;
  layout?: QLayout | QBoxLayout | QGridLayout;
}

const setSplitterProps = (
  widget: RNSplitter,
  newProps: SplitterProps,
  oldProps: SplitterProps
) => {
  const setter: SplitterProps = {
    set orientation(orientation: Orientation) {
      widget.setOrientation(orientation);
    },
    set layout(layout: QLayout | QBoxLayout | QGridLayout) {
      widget.setLayout(layout);
    },
    set sizePolicy(policy: SizePolicy) {
      widget.setSizePolicy(policy.horizontal, policy.vertical);
    }
  };
  Object.assign(setter, newProps);
  setViewProps(widget, newProps, oldProps);
};

/**
 * @ignore
 */
export class RNSplitter extends QSplitter implements RNWidget {
  setProps(newProps: SplitterProps, oldProps: SplitterProps): void {
    setSplitterProps(this, newProps, oldProps);
  }
  removeChild(child: QWidget<any>) {
    throwUnsupported(this);
  }
  appendInitialChild(child: QWidget<any>): void {
    if (child instanceof QWidget) {
      this.addWidget(child);
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
  static tagName = "Splitter";
}
