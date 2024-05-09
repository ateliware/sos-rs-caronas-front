export const validateUUIDFormat = (uuid: string) => {
  const uuidPattern =
    /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i;

  const isValidUuid = uuidPattern.test(uuid);

  return isValidUuid;
};
