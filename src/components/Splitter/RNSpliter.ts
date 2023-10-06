import {
  QWidget,
  QSplitter,
  QLayout,
  QBoxLayout,
  QGridLayout,
  AlignmentFlag,
  Orientation,
  QObjectSignals,
  QSplitterSignals
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
  cols?: number;
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
    },
    set cols(count: number) {
      widget.setProperty("cols", count);
    }
  };
  Object.assign(setter, newProps);
  setViewProps(widget, newProps, oldProps);
};

/**
 * @ignore
 */
export class RNSplitter extends QSplitter implements RNWidget {
  private _layout: QLayout<QObjectSignals> | null = null;
  private _isGridlayout: boolean = false;
  private _numChildrens: number = 0;

  layout() {
    return this._layout;
  }
  setLayout(layout: QLayout<QObjectSignals>) {
    if(layout instanceof QGridLayout) {
      this._isGridlayout = true;
    } 
    this._layout = layout;
    super.setLayout(layout);
  }
  setProps(newProps: SplitterProps, oldProps: SplitterProps): void {
    setSplitterProps(this, newProps, oldProps);
  }
  removeChild(child: QWidget<any>) {
    throwUnsupported(this);
  }
  appendInitialChild(child: QWidget<any>): void {
    if (child instanceof QWidget) {
      if(this._isGridlayout) {
        const cols = this.property("cols").toInt();
        const grid = this.layout() as QGridLayout;
        var num = this._numChildrens;
        const row = Math.floor(num / cols);
        const col = Math.max(0, (num % cols));
        this._numChildrens += 1;
        
        (this.layout() as QGridLayout)!.addWidget(child, row, col, 1, 1,
                                                AlignmentFlag.AlignLeft |
                                                AlignmentFlag.AlignTop);
                    
      } else {
        this.addWidget(child);
      }
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
