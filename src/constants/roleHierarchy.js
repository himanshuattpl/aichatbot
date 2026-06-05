export const ROLE_HIERARCHY = {
  ADMIN: [
    "CEO",
    "CTO",
    "CFO",
    "DEPARTMENT_HEAD",
    "LEAD_MANAGER",
    "sales_manager",
    "sales_executive",
    "vendor_manager",
    "investor_manager",
    "customer_support",
    "USER",
  ],

  CEO: [
    "CTO",
    "CFO",
    "DEPARTMENT_HEAD",
    "LEAD_MANAGER",
    "sales_manager",
    "sales_executive",
    "vendor_manager",
    "investor_manager",
    "customer_support",
    "USER",
  ],

  CTO: [
    "DEPARTMENT_HEAD",
    "USER",
  ],

  CFO: [
    "USER",
  ],

  DEPARTMENT_HEAD: [
    "sales_manager",
    "sales_executive",
    "vendor_manager",
    "investor_manager",
    "customer_support",
    "USER",
  ],

  LEAD_MANAGER: [
    "sales_executive",
    "USER",
  ],

  sales_manager: [
    "sales_executive",
    "USER",
  ],

  sales_executive: [],

  vendor_manager: [],

  investor_manager: [],

  customer_support: [],

  USER: [],
};