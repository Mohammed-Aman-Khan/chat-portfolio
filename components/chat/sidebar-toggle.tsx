"use client";

import { Tooltip } from "@heroui/react";
import { SidebarLeftIcon } from "./icons";

export function SidebarToggle({
  className,
}: {
  className?: string;
}) {
  return (
    <Tooltip>
      <button
        className={className}
        data-testid="sidebar-toggle-button"
        type="button"
      >
        <SidebarLeftIcon size={16} />
      </button>
      <Tooltip.Content>
        Toggle Sidebar
      </Tooltip.Content>
    </Tooltip>
  );
}
