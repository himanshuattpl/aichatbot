http://localhost:5000/api/org    organization

{
  "name": "ATTPL",
  "code": "ATTPL",
  "type": "COMPANY",
  "industry": "Multi Business Group",
  "website": "https://attplgroup.com/",
  "email": "info@attpl.com",
  "phone": "+911234567890",
  "country": "India",
  "status": "ACTIVE"
}

{
    "success": true,
    "data": [
        {
            "id": "cmpzj6qf50000unasp1c3vbnx",
            "name": "ATTPL",
            "code": "ATTPL",
            "type": "COMPANY",
            "industry": "Multi Business Group",
            "website": "https://attplgroup.com/",
            "email": "info@attpl.com",
            "phone": "+911234567890",
            "addressLine1": null,
            "addressLine2": null,
            "city": null,
            "state": null,
            "country": "India",
            "postalCode": null,
            "gstNumber": null,
            "panNumber": null,
            "status": "ACTIVE",
            "parentId": null,
            "createdAt": "2026-06-04T13:28:31.550Z",
            "updatedAt": "2026-06-04T13:28:31.550Z"
        }
    ]
} 



http://localhost:5000/api/dep      department


{
  "organizationId": "cmq0i1eis0000unjsq98s5mor",
  "name": "EMS",
  "code": "EMS",
  "description": "Energy Management Services Department"
}

{
    "success": true,
    "data": {
        "id": "cmq0ibppx0001unxskxfqsgkg",
        "organizationId": "cmq0i1eis0000unjsq98s5mor",
        "name": "EMS",
        "code": "EMS",
        "description": "Energy Management Services Department",
        "headUserId": null,
        "status": "ACTIVE",
        "createdAt": "2026-06-05T05:52:10.484Z",
        "updatedAt": "2026-06-05T05:52:10.484Z"
    }
}


http://localhost:5000/api/auth/register    register admin/chairman

{
  "name": "Super Admin",
  "email": "admin@attpl.com",
  "password": "Admin@123",
  "role": "ADMIN"
}