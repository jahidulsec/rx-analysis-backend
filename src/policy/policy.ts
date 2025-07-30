import type {
  AdminRole,
  userTable,
  surveyTable,
  doctorTable,
  medicineTable,
  territoryTable,
  surveyMedicineTable,
} from "@/db/schema";

type Role = AdminRole;

export type Permissions = {
  survey: {
    dataType: typeof surveyTable.$inferSelect;
    action: "view" | "create" | "update" | "delete";
  };
  surveyMedicine: {
    dataType: typeof surveyMedicineTable.$inferSelect;
    action: "view" | "create" | "update" | "delete";
  };
  doctor: {
    dataType: typeof doctorTable.$inferSelect;
    action: "view" | "create" | "update" | "delete";
  };
  medicine: {
    dataType: typeof medicineTable.$inferSelect;
    action: "view" | "create" | "update" | "delete";
  };
  user: {
    dataType: typeof userTable.$inferSelect;
    action: "view" | "create" | "update" | "delete";
  };
  territory: {
    dataType: typeof territoryTable.$inferSelect;
    action: "view" | "create" | "update" | "delete";
  };
};

type PermissionCheck<Key extends keyof Permissions> =
  | boolean
  | ((
      user: typeof userTable.$inferSelect,
      data: Permissions[Key]["dataType"]
    ) => boolean);

type RoleWithPermissions = {
  [R in Role]: Partial<{
    [Key in keyof Permissions]: Partial<{
      [Action in Permissions[Key]["action"]]: PermissionCheck<Key>;
    }>;
  }>;
};

const ROLES = {
  superadmin: {
    doctor: {
      create: true,
      view: true,
      update: true,
      delete: true,
    },
    user: {
      create: true,
      view: true,
      update: true,
      delete: true,
    },
    survey: {
      create: true,
      view: true,
      update: true,
      delete: true,
    },
    surveyMedicine: {
      create: true,
      view: true,
      update: true,
      delete: true,
    },
    territory: {
      create: true,
      view: true,
      update: true,
      delete: true,
    },
  },
  "chq-admin": {
    doctor: {
      create: true,
      view: true,
      update: true,
      delete: true,
    },
    user: {
      create: true,
      view: true,
      update: true,
      delete: true,
    },
    survey: {
      create: true,
      view: true,
      update: true,
      delete: true,
    },
    surveyMedicine: {
      create: true,
      view: true,
      update: true,
      delete: true,
    },
    territory: {
      create: true,
      view: true,
      update: true,
      delete: true,
    },
  },
  mio: {
    doctor: {
      create: false,
      view: (user, doctor) => user.username === doctor.territoryId,
      update: false,
      delete: false,
    },
    user: {
      create: false,
      view: (user, data) => user.id === data.id,
      update: false,
      delete: false,
    },
    survey: {
      create: true,
      view: (user, survey) => user.id === survey.createdBy,
      update: (user, survey) => user.id === survey.createdBy,
      delete: (user, survey) => user.id === survey.createdBy,
    },
    surveyMedicine: {
      create: true,
      view: true,
      update: true,
      delete: true,
    },
    territory: {
      create: false,
      view: true,
      update: false,
      delete: false,
    },
  },
} as const satisfies RoleWithPermissions;

export function hasPermission<Resource extends keyof Permissions>(
  user: typeof userTable.$inferSelect,
  resource: Resource,
  action: Permissions[Resource]["action"],
  data?: Permissions[Resource]["dataType"]
) {
  const roles = [user.role] as Role[];

  return roles.some((role) => {
    const permission = (ROLES as RoleWithPermissions)[role][resource]?.[action];
    if (permission == null) return false;

    if (typeof permission === "boolean") return permission;
    return data != null && permission(user, data);
  });
}
