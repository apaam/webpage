---
title: "ParaView rendering"
---

## ParaView rendering

VTK output from `DataDumper` (see [Basic usage](basic-usage.md)) opens in [ParaView](https://www.paraview.org/). File naming often follows time-step or cycle indices; use **File → Open** and select `*.vtk` or `*.vtk.series` collections as produced by your run.

### Spherical particles

- Import particle data into ParaView.
- Set **Representation** to **Point Gaussian** and adjust the glyph radius.
- For polydisperse radii, open **Toggle advanced properties**, enable **Use Scale Array**, pick the scale array component, and tune **Range**.

### General particles and walls

- Set `dump_reconstructed = True` on `DataDumper` so non-spherical particles export reconstructed surface meshes.
- Open the reconstructed VTK files in ParaView.

### Contact force chain

- Enable contact output: `dumper.dump_contact_info = True` (with your `DataDumper` instance `dumper`).
- Load contact VTK data in ParaView.
- Apply a **Tube** filter to the contact segments and adjust tube radius for visibility.

### Ray tracing

- Enable **Ray Tracing** at the bottom of the **Properties** panel.
- Set **Back end** to **OsPRay pathtracer**.
- Use **Samples Per Pixel** ≈ 5 for a reasonable speed/quality trade-off.
- Set **Background mode** to **Backplate** (white works well for publications).
- Adjust **Material** settings in **Properties** as needed.

### Create animation

- **File → Save Animation**; choose AVI (or a preferred container).
- Suggested: **1920×1080**, **24 fps** for smooth playback.
- Re-encode with `ffmpeg` or a cloud transcoder before embedding on the web.

For **Tencent Cloud** workflow (Chinese UI), the prior site recipe still applies: upload in **云点播 → 媒资管理**, transcode (e.g. **TESHD-H264-MP4-720P**), then copy the playback URL from **管理**.

### Client / server

Tunnel to a remote **pvserver**:

```bash
ssh -L 11111:localhost:11111 -p [port] [user]@[remote-ip]
```

On the remote host:

```bash
pvserver
```

Locally, open ParaView and connect with **File → Connect**, mode **Client / Server**, host `localhost`, port `11111`.
