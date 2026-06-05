import organizationRepository
  from "../../repositories/organization.repository.js";

class OrganizationService {
  async createOrganization(data) {
    return organizationRepository.create(
      data
    );
  }

  async getOrganizations() {
    return organizationRepository.findAll();
  }

  async getOrganization(id) {
    const organization =
      await organizationRepository.findById(
        id
      );

    if (!organization) {
      throw new Error(
        "Organization not found"
      );
    }

    return organization;
  }

  async updateOrganization(
    id,
    data
  ) {
    return organizationRepository.update(
      id,
      data
    );
  }

  async deleteOrganization(id) {
    return organizationRepository.delete(
      id
    );
  }
}

export default new OrganizationService();