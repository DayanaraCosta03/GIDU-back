import { DataSource } from 'typeorm';
import { PermissionSchema, RoleSchema, WorkAreaSchema } from '../schemas';

export const runSeed = async (dataSource: DataSource) => {
  const permissionRepo = dataSource.getRepository(PermissionSchema);
  const roleRepo = dataSource.getRepository(RoleSchema);
  const workAreaRepo = dataSource.getRepository(WorkAreaSchema);

  // ---- PERMISOS ----
  const permissions = [
    'registro',
    'derivación',
    'consulta',
    'generación de reportes',
  ];

  const permissionEntities: PermissionSchema[] = [];

  for (const name of permissions) {
    const existing = await permissionRepo.findOne({ where: { name } });
    if (!existing) {
      const p = permissionRepo.create({ name });
      await permissionRepo.save(p);
      permissionEntities.push(p);
    } else {
      permissionEntities.push(existing);
    }
  }

  // ---- ROLES ----
  const rolesData = [
    {
      name: 'Administrador',
      permissions: permissionEntities,
    },
    {
      name: 'Empleado',
      permissions: permissionEntities.filter(
        (p) => p.name !== 'generación de reportes',
      ),
    },
  ];

  const roleEntities: RoleSchema[] = [];
  for (const data of rolesData) {
    let role = await roleRepo.findOne({ where: { name: data.name } });
    if (!role) {
      role = roleRepo.create(data);
      await roleRepo.save(role);
    }
    roleEntities.push(role);
  }

  // ---- ÁREAS DE TRABAJO ----
  const workAreas = ['Obras', 'Catastro', 'Defensa Civil'];

  for (const name of workAreas) {
    const existing = await workAreaRepo.findOne({ where: { name } });
    if (!existing) {
      await workAreaRepo.save(workAreaRepo.create({ name }));
    }
  }

  console.log('Seed ejecutado correctamente');
};
