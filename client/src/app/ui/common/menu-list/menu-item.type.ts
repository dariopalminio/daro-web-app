
export enum AccessType {
    ANONYMOUS = "ANONYMOUS",
    USER = "USER",
    ADMIN = "ADMIN",
  }

/**
 * Interface Type for Menu Item
 */
export interface MenuItemType {
    key: string
    title: string
    path: string
    icon: any
    access: string[] //AccessType.ANONYMOUS | AccessType.USER | AccessType.ADMIN
    divider: boolean
    submenu: MenuItemType[] | null
};


