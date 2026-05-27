gcloud auth configure-docker us-central1-docker.pkg.dev
gcloud artifacts docker images list us-central1-docker.pkg.dev/qwiklabs-gcp-01-93418b322a83/cloud-run-source-deploy
docker pull us-central1-docker.pkg.dev/qwiklabs-gcp-01-93418b322a83/cloud-run-source-deploy/IMAGE_NAME:TAG
docker pull us-central1-docker.pkg.dev/qwiklabs-gcp-01-93418b322a83/cloud-run-source-deploy/genai-app-insurancerisksummary-prot-1-17797848644@sha256:f1a43880d36fa98e9cfaf7516b1574a490f39bef7d47d5b0f2700b3ed1f02bbf
gcloud storage buckets list
docker save -o my-image.tar us-central1-docker.pkg.dev/qwiklabs-gcp-01-93418b322a83/cloud-run-source-deploy/genai-app-insurancerisksummary-prot-1-17797848644@sha256:f1a43880d36fa98e9cfaf7516b1574a490f39bef7d47d5b0f2700b3ed1f02bbf
gcloud storage cp my-image.tar gs://qwiklabs-gcp-01-93418b322a83-bucket/
gsutil -m cp -r   "gs://cloud-ai-platform-e70a5177-de78-488e-aabb-955b0830a2df/prompt-data"   .
