import { registerComponent, ComponentConfig } from "../config";
import { Fiber } from "react-reconciler";
import { SplitterProps, RNSplitter } from "./RNSpliter";
import { AppContainer } from "../../reconciler";

class SplitterConfig extends ComponentConfig {
  tagName = RNSplitter.tagName;
  shouldSetTextContent(nextProps: SplitterProps): boolean {
    return false;
  }
  createInstance(
    newProps: SplitterProps,
    rootInstance: AppContainer,
    context: any,
    workInProgress: Fiber
  ): RNSplitter {
    const widget = new RNSplitter();
    widget.setProps(newProps, {});
    return widget;
  }
  finalizeInitialChildren(
    instance: RNSplitter,
    newProps: SplitterProps,
    rootContainerInstance: AppContainer,
    context: any
  ): boolean {
    return true;
  }
  commitMount(
    instance: RNSplitter,
    newProps: SplitterProps,
    internalInstanceHandle: any
  ): void {
    if (newProps.visible !== false) {
      instance.show();
    }
    return;
  }
  commitUpdate(
    instance: RNSplitter,
    updatePayload: any,
    oldProps: SplitterProps,
    newProps: SplitterProps,
    finishedWork: Fiber
  ): void {
    instance.setProps(newProps, oldProps);
  }
}

export const Splitter = registerComponent<SplitterProps>(new SplitterConfig());
