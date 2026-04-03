# VPS Auto-Deployment Implementation Plan

This plan outlines the steps to automate the deployment of the 123ToDo marketing website to the VPS.

## 1. Workflow Update

Modify `.github/workflows/actions.yaml` to include a deployment stage.

### Steps in the 'deploy' job:

1. **Checkout**: Get the code.
2. **Build**: Run `npm install` and `npm run build`.
3. **Upload**: Use `scp` to send `dist/`, `Dockerfile`, `docker-compose.yml`, and `nginx/` to the VPS.
4. **Restart**: Use `ssh` to run `docker compose build` and `docker compose up -d` on the VPS.

## 2. GitHub Secrets (Mandatory)

To allow GitHub to access your VPS, you MUST add the following secrets in your GitHub repository (**Settings > Secrets and variables > Actions > New repository secret**):

| Secret Name    | Value                 |
| :------------- | :-------------------- |
| `VPS_HOST`     | `51.195.136.55`       |
| `VPS_USERNAME` | `debian`              |
| `VPS_PASSWORD` | _Your login password_ |
| `VPS_PORT`     | `9947`                |

## 3. Implementation Details

The workflow will target the directory specified in `WEBSITE-PLAN.md`:
`/home/debian/wordpress-docker/todo-app/`

### Docker Commands:

- `docker compose build --no-cache astrowind`
- `docker compose up -d astrowind`
