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

Install [commitlint](https://github.com/conventional-changelog/commitlint) and user the configuration with [conventional commits](https://www.conventionalcommits.org/en/)

```
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```

Add the commitlint config file

```
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

Add the rules for commitlint in the `commitlint.config.js`

```
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-empty': [2, 'never'],
    'subject-max-length': [2, 'always', 200],
    'subject-min-length': [2, 'always', 10],
    'body-min-length': [2, 'always', 10],
    'scope-enum': [2, 'always', ['auth']],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'style',
        'test',
      ],
    ],
  },
};

```

Install [husky](https://github.com/typicode/husky)

```
npm install husky --save-dev
```

Add `husky` to the `package.json` file with the following configuration:

 - **pre-commit**: we run the `nx format:write` command in order to format all the code before every commit and then we run the `nx affected:lint` to run the lint only for the affected code and at the end we run the `nx affected:test` command to run the test for the affected code.
 - **commit-msg**: we run the commilint to be sure that the commit message meets with the configuration.

```
{
  ...
  "husky": {
    "hooks": {
      "pre-commit": "nx format:write && nx affected:lint && nx affected:test",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

### Types allowed in the commitlint

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests
