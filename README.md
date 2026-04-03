# Azure DevOps Extension API

REST client libraries and TypeScript contracts for Azure DevOps web extension developers.

## Report Issues

Report issues or make suggestions via the Developer Community portal:

https://developercommunity.visualstudio.com/AzureDevOps

> **Note:** This package contains thin auto-generated clients produced from the Azure DevOps codebase. Opening issues or pull requests in this repository will not be actionable — please use the Developer Community portal above.

## Release Notes

### v5 — Dual CJS/ESM Module Support

- **ES Module Support**: The package now ships both CommonJS and ESM builds. Bundlers and modern runtimes automatically resolve the correct format via [conditional exports](https://nodejs.org/api/packages.html#conditional-exports).
- **Backward Compatibility**: Existing CommonJS consumers require no changes.
- **AMD Removed**: The v4 package used AMD module format. v5 replaces it with CommonJS + ESM. If you depend on AMD loading, pin to v4.

## Usage

Install:

```
npm install azure-devops-extension-api
```

### ES Modules

```typescript
import { GitRestClient } from "azure-devops-extension-api/Git";
import { getClient } from "azure-devops-extension-api";

const gitClient = getClient(GitRestClient);
```

### CommonJS

```javascript
const { GitRestClient } = require("azure-devops-extension-api/Git");
const { getClient } = require("azure-devops-extension-api");

const gitClient = getClient(GitRestClient);
```

### Subpath Imports

Each API area is available as a subpath (e.g. `azure-devops-extension-api/Build`, `azure-devops-extension-api/WorkItemTracking`). This enables tree-shaking and smaller bundles.

## Get Started

See [Develop a web extension for Azure DevOps](https://docs.microsoft.com/en-us/azure/devops/extend/get-started/node?view=vsts) and the [azure-devops-extension-sample](https://github.com/Microsoft/azure-devops-extension-sample) repository.

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

