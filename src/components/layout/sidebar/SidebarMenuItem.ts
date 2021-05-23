export interface SidebarMenuItem {
    title: string
    path: string
    icon: any
    iconOpened?: any
    iconClosed?: any
    subnav?: SidebarMenuItem[]
}