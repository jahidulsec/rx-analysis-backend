import { forbiddenError } from "@/lib/errors";
import { userLib } from "@/lib/user";
import { hasPermission, type Permissions } from "@/policy/policy";
import { Factory } from "hono/factory";

const factory = new Factory();

const authorizeRole = <Resource extends keyof Permissions>(
  resource: Resource,
  action: Permissions[Resource]["action"],
  getData?: (c?: any) => Promise<Permissions[Resource]["dataType"] | undefined>
) => {
  return factory.createMiddleware(async (c, next) => {
    const payload = await c.get("jwtPayload");

    if (!payload?.id) {
      return forbiddenError("You are unauthorized");
    }

    // get user data
    const user = await userLib.getSingle(payload.id as string);
    if (!user || user.length === 0) {
      return forbiddenError("User not found");
    }

    // Dynamically fetch resource data, if needed (e.g., for ownership check)
    const data = getData ? await getData(c) : undefined;

    const isPermitted = hasPermission(user[0], resource, action, data);

    if (!isPermitted) {
      return forbiddenError(
        `User with role ${user[0].role} has no permission to perform ${action} on ${resource}`
      );
    }

    await next();
  });
};

export { authorizeRole };
