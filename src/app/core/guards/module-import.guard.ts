export function throwIfAlreadyLoaded(
  parentModule: any,
  moduleName: string,
): any {
  if (parentModule) {
    throw new Error(
      `${moduleName} has already been loaded. Import ${moduleName} modules in the AppModule only.`,
    );
  }
}
