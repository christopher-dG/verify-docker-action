# Verify Docker Action

If you're trying to be security-conscious with GitHub Actions, you've probably heard the advice to pin your actions to a commit rather than using someting like `v1`, `latest` or `master`.
This works great for JavaScript actions because the commit identifies the code that you'll be running.
However, this doesn't work for Docker actions because the code that they run is not always directly tied to the repository contents at the given commit, but rather to some tagged Docker image.
Even if you lock down to a specific commit, ensuring that you'll always get the same Docker image, you can't guarantee that the image won't change.
This is because Docker tags (like Git tags) are mutable, which means that someone could replace the code referred to by a given version with something malicious, and you'd have no way of stopping it.

This action lets you set up ensure that the content of a Docker image is exactly what you expect it to be by verifying the image digest to a known good value.

## Inputs

- `image`: The Docker image being verified, e.g. `foo/bar:1.2.3`.
- `digest`: The exoected image digest, in the format described [here](https://docs.docker.com/registry/spec/api/#content-digests#content-digests).

## Example

```yml
jobs:
  something:
    steps:
      - uses: christopher-dG/verify-docker-action@v1
        with:
          image: degraafc/tagbot:1.5.3
          digest: sha256:072dce448d982aba5d26587c1a9a8f5478fc5bf0a4e30f65a305f718f26e141f
      - uses: JuliaRegistries/TagBot@v1.5.3
```
