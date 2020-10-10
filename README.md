# NxWorkspaceExperiments

## Create workspace

In order to create the nx workspace we need to run the following command

```
npx create-nx-workspace@latest
```

After run this command we need to set the following params

```
? Workspace name (e.g., org name)       : nx-workspace-experiments
? What to create in the new workspace   : empty
? CLI to power the Nx Workspace         : Nx
? Use Nx Cloud?                         : No
```

## Configure commitlint, conventionalCommits and husky

```
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```

```
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

```
npm install husky --save-dev
```

Add `husky` to the `package.json` file

```
{
  ...
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

### Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests
