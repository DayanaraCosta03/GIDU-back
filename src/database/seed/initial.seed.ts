import { DataSource } from 'typeorm';

import { PermissionSchema, RoleSchema, WorkAreaSchema } from '../schemas';

export const runSeed = async (dataSource: DataSource) => {
  const permissionRepo = dataSource.getRepository(PermissionSchema);
  const roleRepo = dataSource.getRepository(RoleSchema);
  const areaRepo = dataSource.getRepository(WorkAreaSchema);

  // ------------------------
  // PERMISSIONS
  // ------------------------
  const permissions = ['Registrar', 'Derivar', 'Vista', 'Reportes'];

  const permissionEntities: PermissionSchema[] = [];

  for (const name of permissions) {
    let perm = await permissionRepo.findOne({ where: { name } });

    if (!perm) {
      perm = permissionRepo.create({ name });
      await permissionRepo.save(perm);
    }

    permissionEntities.push(perm);
  }

  // Helper
  const findPermission = (name: string) =>
    permissionEntities.find((p) => p.name === name)!;

  // ------------------------
  // ROLES
  // ------------------------
  const rolesData = [
    {
      name: 'Admin',
      permissions: permissionEntities, // ALL permissions
    },
    {
      name: 'Operador',
      permissions: [findPermission('Registrar'), findPermission('Vista')],
    },
  ];

  for (const roleData of rolesData) {
    let role = await roleRepo.findOne({ where: { name: roleData.name } });

    if (!role) {
      role = roleRepo.create(roleData);
      await roleRepo.save(role);
    }
  }

  // ------------------------
  // WORK AREAS
  // ------------------------
  const areas = ['Obras', 'Catastro', 'Defensa Civil'];

  for (const name of areas) {
    const exists = await areaRepo.findOne({ where: { name } });
    if (!exists) {
      await areaRepo.save(areaRepo.create({ name }));
    }
  }

  console.log('Seed executed successfully');
};
