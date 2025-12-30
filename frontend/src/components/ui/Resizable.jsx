"use client";

import * as React from "react";
import { GripVerticalIcon } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

import "./Resizable.css";

function ResizablePanelGroup({ className = "", ...props }) {
  return (
    <ResizablePrimitive.PanelGroup
      data-slot="resizable-panel-group"
      className={`resizable-panel-group ${className}`}
      {...props}
    />
  );
}

function ResizablePanel(props) {
  return (
    <ResizablePrimitive.Panel
      data-slot="resizable-panel"
      {...props}
    />
  );
}

function ResizableHandle({
  withHandle = false,
  className = "",
  ...props
}) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle"
      className={`resizable-handle ${className}`}
      {...props}
    >
      {withHandle && (
        <div className="resizable-handle-grip">
          <GripVerticalIcon className="resizable-handle-icon" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
