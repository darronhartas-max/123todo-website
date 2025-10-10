# 123 ToDo Website Deployment Guide

## Current Deployment
- **Live URL**: https://123todo.com and https://www.123todo.com
- **Status**: ✅ Active (Astro marketing website)
- **Last Deployed**: 2025-10-10

## Quick Deploy (For Updates)

### 1. Build locally
```bash
cd /Users/darronhartas/Desktop/123todo-website
npm run build
```

### 2. Upload via FileZilla
- **Host**: 51.195.136.55
- **Port**: 9947
- **Protocol**: SFTP
- **Username**: debian
- **Local path**: `/Users/darronhartas/Desktop/123todo-website/dist/`
- **Remote path**: `/home/debian/wordpress-docker/todo-app/`
- **Action**: Delete all old files, upload all new files from inside dist/

### 3. Rebuild and restart container
```bash
ssh -p 9947 debian@51.195.136.55
cd /home/debian/wordpress-docker
docker compose build todo-app
docker compose up -d todo-app
```

**Note**: Container is configured to automatically connect to both `web` and `traefik_proxy` networks in docker-compose.yml. No manual network connection needed.

### 4. Verify deployment
- Visit: https://123todo.com (hard refresh: Cmd+Shift+R)
- Visit: https://www.123todo.com (should redirect or show same site)

## VPS Architecture

**Container Details**:
- **Container name**: `todo-app`
- **Upload directory**: `/home/debian/wordpress-docker/todo-app/`
- **Dockerfile**: `/home/debian/wordpress-docker/Dockerfile.todo`
- **Domains**: 123todo.com and www.123todo.com
- **Traefik config**: `/etc/traefik/dynamic/123todo.yaml`
- **Networks**: `traefik_proxy` and `wordpress-docker_web`
- **Base image**: nginx:alpine

## Complete Site Architecture

**All 123 ToDo Deployments**:
1. **Marketing Site**: https://123todo.com (Astro)
   - Container: `todo-app`
   - Directory: `/home/debian/wordpress-docker/todo-app/`
   
2. **React App**: https://app.123todo.com (React PWA)
   - Container: `app-123todo`
   - Directory: `/home/debian/wordpress-docker/app-123todo/`

## Troubleshooting

**Bad Gateway Error**:
```bash
# Check container is running
docker ps | grep todo-app

# Check container networks
docker inspect todo-app --format='{{range $net,$v := .NetworkSettings.Networks}}{{$net}} {{end}}'

# Connect to traefik_proxy if needed
docker network connect traefik_proxy todo-app
```

**Site shows old content**:
```bash
# Rebuild without cache
docker compose build --no-cache todo-app
docker compose up -d todo-app

# Clear browser cache (hard refresh)
```

## Initial Setup (Already Complete)

The following was completed on 2025-10-10:
- ✅ Replaced React app files with Astro marketing site in todo-app directory
- ✅ Rebuilt Docker image with new files
- ✅ Connected container to traefik_proxy network
- ✅ SSL certificate already configured (Let's Encrypt)
- ✅ Domains 123todo.com and www.123todo.com routing configured

---

**Project**: 123 ToDo Marketing Website
**Framework**: Astro 5.x with AstroWind template
**Deployment Date**: 2025-10-10
**Maintained By**: Darron Hartas
