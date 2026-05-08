# GitHub Secrets Checklist

Please add the following secrets to your GitHub repository under **Settings > Secrets and variables > Actions**.

| Secret Name | Description | Value (Get from...) |
| :--- | :--- | :--- |
| `RENDER_DEPLOY_HOOK_URL` | Hook to trigger backend deploy | Render Dashboard > Service > Settings |
| `VERCEL_TOKEN` | Personal Access Token | [Vercel Account Settings](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Organization/Team ID | `.vercel/project.json` or Dashboard |
| `VERCEL_PROJECT_ID` | Project ID | `.vercel/project.json` or Dashboard |

> [!WARNING]
> **Do not** add your actual secret values to this file or commit them to Git. This file is just a reminder of what needs to be configured in the GitHub UI.
