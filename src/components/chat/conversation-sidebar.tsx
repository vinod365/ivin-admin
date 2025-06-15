import SidebarMessage from "./sidebar-message";

export default function ConversationSidebar() {
  return (
    <div className="bg-white p-4 rounded-[12px] h-full">
      <SidebarMessage />
      <SidebarMessage />
      <SidebarMessage />
    </div>
  );
}
