import { QWidget, WindowState, QCursor, CursorShape, QIcon, FlexLayout, WidgetEventTypes, QWidgetSignals, QLayout, QObjectSignals, ContextMenuPolicy, QGridLayout, AlignmentFlag, QSizePolicyPolicy } from "@nodegui/nodegui";
import { NativeRawPointer } from "@nodegui/nodegui/dist/lib/core/Component";
import { QDialog } from "@nodegui/nodegui/dist/lib/QtWidgets/QDialog";
import { RNWidget, RNProps } from "../config";

/**
 * The View component can be used to encapsulate other components and provide structure.
 * It functions similar to a div in the web world. It is based on
 * [NodeGui's QWidget](https://docs.nodegui.org/docs/api/generated/classes/QWidget).
 * ## Example
 * ```javascript
 *import React from "react";
 *import { Renderer, Button, Window, View } from "./index";
 *const App = () => {
 *  return (
 *    <Window>
 *      <View>
 *        <Button style={buttonStyle} text={"Hello"} />
 *        <Button style={buttonStyle} text={"World"} />
 *      </View>
 *    </Window>
 *  );
 *};
 *const buttonStyle = `
 *  color: white;
 *`;
 *Renderer.render(<App />);
 * ```
 */

export interface ViewProps<Signals extends {}> extends RNProps {
  /**
   * Shows or hides the widget and its children. [QWidget: show](https://docs.nodegui.org/docs/api/generated/classes/QWidget#widgetshow)
   */
  visible?: boolean;
  /**
   * Sets the property that holds the widget's style sheet. [QWidget: setStyleSheet](https://docs.nodegui.org/docs/api/generated/classes/QWidget#widgetsetstylesheetstylesheet)
   */
  styleSheet?: string;
  /**
   * Sets the inline stylesheet property. [QWidget: setInlineStyle](https://docs.nodegui.org/docs/api/generated/classes/QWidget#widgetsetinlinestylestyle)
   */
  style?: string;
  /**
   * Sets the screen position as well as size of the widget. [QWidget: setGeometry](https://docs.nodegui.org/docs/api/generated/classes/QWidget#widgetsetgeometryx-y-width-height)
   */
  geometry?: Geometry;
  /**
   * Sets the object name (id) of the widget in Qt. Object name can be analogous to id of an element in the web world. Using the objectName of the widget one can reference it in the Qt's stylesheet much like what we do with id in the web world. [QWidget: setObjectName](https://docs.nodegui.org/docs/api/generated/classes/QWidget#widgetsetobjectnameobjectname)
   */
  id?: string;
  /**
   * Sets the property that tells whether mouseTracking is enabled for the widget. [QWidget: setMouseTracking](https://docs.nodegui.org/docs/api/generated/classes/QWidget#widgetsetmousetrackingismousetracked)
   */
  mouseTracking?: boolean;
  /**
   * Sets the property that tells whether the widget is enabled. In general an enabled widget handles keyboard and mouse events; a disabled widget does not. [QWidget: setEnabled](https://docs.nodegui.org/docs/api/generated/classes/QWidget#widgetsetenabledenabled)
   */
  enabled?: boolean;
  /**
   * This property holds the level of opacity for the window. [QWidget: setWindowOpacity](https://docs.nodegui.org/docs/api/generated/classes/QWidget#widgetsetwindowopacityopacity)
   */
  windowOpacity?: number;
  /**
   * Sets the window title property. [QWidget: setWindowTitle](https://docs.nodegui.org/docs/api/generated/classes/QWidget#widgetsetwindowtitletitle)
   */
  windowTitle?: string;
  /**
   * Sets the window state. [QWidget: setWindowState](https://docs.nodegui.org/docs/api/generated/classes/QWidget#widgetsetwindowstatestate)
   */
  windowState?: WindowState;
  /**
   * Sets the window mouse cursor. [QWidget: setCursor](https://docs.nodegui.org/docs/api/generated/classes/QWidget#widgetsetcursorcursor)
   */
  cursor?: CursorShape | QCursor;
  /**
   * Sets the window icon. [QWidget: setWindowIcon](https://docs.nodegui.org/docs/api/generated/classes/QWidget#widgetsetwindowiconicon)
   */
  windowIcon?: QIcon;
  /**
   * Sets the minimum size of the widget. [QWidget: setMinimumSize](https://docs.nodegui.org/docs/api/generated/classes/QWidget#widgetsetminimumsizewidth-height)
   */
  minSize?: Size;
  /**
   * Sets the maximum size of the widget. [QWidget: setMaximumSize](https://docs.nodegui.org/docs/api/generated/classes/QWidget#widgetsetmaximumsizewidth-height)
   */
  maxSize?: Size;
  /**
   * Sets both the minimum and maximum sizes of the widget. [QWidget: setFixedSize](https://docs.nodegui.org/docs/api/generated/classes/QWidget#widgetsetfixedsizewidth-height)
   */
  size?: ViewSize;
  /**
   * 
   */
  sizePolicy?: SizePolicy;
  /**
   * Sets the screen position of the widget. [QWidget: move](https://docs.nodegui.org/docs/api/generated/classes/QWidget#widgetmovex-y)
   */
  pos?: Position;
  /**
   * Prop to set the event listener map. See [Handlong Events](/docs/guides/handle-events)
   */
  on?: Partial<WidgetEventListeners | Signals>;
  /**
   * Prop to set the ref. The ref will return the underlying nodegui widget.
   */
  ref?: any;
  /**
   * Prop to set the Widget Attributes. example:
   * `<View attributes={{[WidgetAttributes.WA_Disabled]: true}} />`
   */
  attributes?: WidgetAttributesMap;

  /**
   * Prop to set the Widget flags. example:
   * `<View windowFlags={{[WindowType.SplashScreen]: true}} />`
   */
  windowFlags?: WindowFlagsMap;

  /**
   * 
   */
  menuPolicy?: ContextMenuPolicy;

  /**
   * 
   */
  layout?: QLayout;

  /**
   * 
   */
  rows?: number;

  /**
   * 
   */
  cols?: number;
}

/**
 * @ignore
 */
export function setViewProps<Signals extends {}>(widget: QWidget<any>, newProps: ViewProps<Signals>, oldProps: ViewProps<Signals>) {
  const setter: ViewProps<Signals> = {
    set visible(shouldShow: boolean) {
      shouldShow ? widget.show() : widget.hide();
    },
    set styleSheet(styleSheet: string) {
      widget.setStyleSheet(styleSheet);
    },
    set layout(layout: QLayout) {
      widget.setLayout(layout);
    },
    set style(inlineStyle: string) {
      if (newProps.styleSheet) {
        console.warn("Both styleSheet and inlineStyle can't be used together");
      }
      widget.setInlineStyle(inlineStyle);
    },
    set geometry(geometry: Geometry) {
      widget.setGeometry(geometry.x, geometry.y, geometry.width, geometry.height);
    },
    set id(id: string) {
      widget.setObjectName(id);
    },
    set mouseTracking(isMouseTracked: boolean) {
      widget.setMouseTracking(isMouseTracked);
    },
    set enabled(enable: boolean) {
      widget.setEnabled(enable);
    },
    set windowOpacity(opacity: number) {
      widget.setWindowOpacity(opacity);
    },
    set windowTitle(title: string) {
      widget.setWindowTitle(title);
    },
    set windowState(state: WindowState) {
      widget.setWindowState(state);
    },
    set cursor(cursor: CursorShape | QCursor) {
      widget.setCursor(cursor);
    },
    set windowIcon(icon: QIcon) {
      widget.setWindowIcon(icon);
    },
    set minSize(size: Size) {
      widget.setMinimumSize(size.width, size.height);
    },
    set maxSize(size: Size) {
      widget.setMaximumSize(size.width, size.height);
    },
    set size(size: ViewSize) {
      if (size.fixed) {
        widget.setFixedSize(size.width, size.height);
      } else {
        const minSize = newProps.minSize || { width: 0, height: 0 };
        const maxSize = newProps.maxSize || {
          width: 16777215,
          height: 16777215,
        };
        widget.setMinimumSize(minSize.width, minSize.height);
        widget.setMaximumSize(maxSize.width, maxSize.height);
        widget.resize(size.width, size.height);
      }
    },
    set pos(position: Position) {
      widget.move(position.x, position.y);
    },
    set on(listenerMap: Partial<WidgetEventListeners | Signals>) {
      const listenerMapLatest: any = Object.assign({}, listenerMap);
      const oldListenerMap = Object.assign({}, oldProps.on);
      Object.entries(oldListenerMap).forEach(([eventType, oldEvtListener]) => {
        const newEvtListener = listenerMapLatest[eventType];
        if (oldEvtListener !== newEvtListener) {
          widget.removeEventListener(eventType as any, oldEvtListener);
        } else {
          delete listenerMapLatest[eventType];
        }
      });

      Object.entries(listenerMapLatest).forEach(([eventType, newEvtListener]) => {
        widget.addEventListener(eventType as any, newEvtListener);
      });
    },
    set attributes(attributesMap: WidgetAttributesMap) {
      Object.entries(attributesMap).forEach(([attribute, value]) => {
        widget.setAttribute(Number(attribute), value);
      });
    },
    set windowFlags(windowFlagsMap: WindowFlagsMap) {
      Object.entries(windowFlagsMap).forEach(([flag, value]) => {
        widget.setWindowFlag(Number(flag), value);
      });
    },
    set menuPolicy(menuPolicy: ContextMenuPolicy) {
      widget.setContextMenuPolicy(menuPolicy);
    },
    set sizePolicy(policy: SizePolicy) {
      widget.setSizePolicy(policy.horizontal, policy.vertical);
    },
    set rows(count: number) {
      widget.setProperty("rows", count);
    },
    set cols(count: number) {
      widget.setProperty("cols", count);
    }
  };
  Object.assign(setter, newProps);
}

/**
 * @ignore
 */
export class RNView extends QWidget implements RNWidget {
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
  setProps(newProps: ViewProps<QWidgetSignals>, oldProps: ViewProps<QWidgetSignals>): void {
    setViewProps(this, newProps, oldProps);
  }
  insertBefore(child: QWidget<any>, beforeChild: QWidget<any>): void {
    if (!this.layout() || child instanceof QDialog) {
      !this.layout() && console.warn("parent has no layout to insert child before another child");
      return;
    }
    (this.layout() as FlexLayout).insertChildBefore(child, beforeChild);
  }
  static tagName = "view";
  appendInitialChild(child: QWidget<any>): void {
    this.appendChild(child);
  }
  appendChild(child: QWidget<any>): void {
    if (!child || child instanceof QDialog) {
      return;
    }
    if (!this.layout()) {
      const flexLayout = new FlexLayout();
      flexLayout.setFlexNode(this.getFlexNode());
      this.setLayout(flexLayout);
    }

    if(this._isGridlayout) {
      const cols = this.property("cols").toInt();
      const rows = this.property("rows").toInt();
      const grid = this.layout() as QGridLayout;
      var num = this._numChildrens;
      const row = Math.floor(num / cols);
      const col = Math.max(0, (num % cols));
      this._numChildrens += 1;

      if(rows > 0 && row >= rows ) {
        console.warn(`Max rows count is ${rows}`);
        return;
      }
      (this.layout() as QGridLayout)!.addWidget(child, row, col, 1, 1,
                                              AlignmentFlag.AlignLeft |
                                              AlignmentFlag.AlignTop);
                  
    }
    else {
      this.layout()!.addWidget(child);
    }
  }
  removeChild(child: QWidget<any>) {
    if (!this.layout()) {
      console.warn("parent has no layout to remove child from");
      return;
    }
    this.layout()!.removeWidget(child);
    child.close();
    this._numChildrens -= 1;
    this._numChildrens = Math.max(0, this._numChildrens);
  }
}

export type Geometry = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Size = {
  width: number;
  height: number;
};
export type ViewSize = Size & {
  fixed?: boolean;
};
export type Position = {
  x: number;
  y: number;
};

export type WidgetAttributesMap = {
  [key: number]: boolean;
};

export type WindowFlagsMap = {
  [key: number]: boolean;
};

export type WidgetEventListeners = {
  [key in WidgetEventTypes]: (event?: NativeRawPointer<"QEvent">) => void;
};

export type SizePolicy = {
  horizontal: QSizePolicyPolicy;
  vertical: QSizePolicyPolicy;
};
