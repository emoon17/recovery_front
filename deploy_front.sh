#!/bin/bash

### [ 설정 영역 - 필요에 따라 수정 ] ###
KEY_PATH="/c/jungeunhye/14.wehago/recovery-key.pem"  # 또는 C:/.. 경로를 WSL 기준 경로로 변환
EC2_USER="ec2-user"
EC2_HOST="13.209.126.76"
EC2_DIST_PATH="/home/ec2-user/dist"
NGINX_PATH="/usr/share/nginx/html"

### [ 1. 로컬 빌드 ]
echo "📦 Building Vue project..."
npm run build || { echo "❌ Build failed"; exit 1; }

### [ 2. EC2로 빌드 파일 전송 ]
echo "🚀 Uploading dist/ to EC2..."
scp -i "$KEY_PATH" -r dist "$EC2_USER@$EC2_HOST:/home/ec2-user/" || { echo "❌ SCP failed"; exit 1; }

### [ 3. EC2에서 기존 html 삭제 후 새 dist 복사 ]
echo "🔧 Deploying on EC2..."
ssh -i "$KEY_PATH" "$EC2_USER@$EC2_HOST" << EOF
  sudo rm -rf "$NGINX_PATH"/*
  sudo cp -r "$EC2_DIST_PATH"/* "$NGINX_PATH"
  sudo systemctl restart nginx
EOF

echo "✅ 배포 완료! → http://$EC2_HOST"
