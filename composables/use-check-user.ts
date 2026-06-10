export default async function (event: any) {
  const session = (await getUserSession(event)) as any;

  if (!session || Object.keys(session).length === 0) {
    return false;
  } else {
    return session.user;
  }
}
