import departmentRepository
  from "../../repositories/department.repository.js";

class DepartmentService {
  async createDepartment(data) {
    return departmentRepository.create(
      data
    );
  }

  async getDepartments() {
    return departmentRepository.findAll();
  }

  async getDepartment(id) {
    const department =
      await departmentRepository.findById(
        id
      );

    if (!department) {
      throw new Error(
        "Department not found"
      );
    }

    return department;
  }

  async updateDepartment(
    id,
    data
  ) {
    return departmentRepository.update(
      id,
      data
    );
  }

  async deleteDepartment(id) {
    return departmentRepository.delete(
      id
    );
  }
}

export default new DepartmentService();