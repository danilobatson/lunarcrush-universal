declare module 'validate-npm-package-name' {
  interface ValidationResult {
    validForNewPackages: boolean;
    validForOldPackages: boolean;
    errors?: string[];
    warnings?: string[];
  }
  
  function validatePackageName(name: string): ValidationResult;
  export = validatePackageName;
}
