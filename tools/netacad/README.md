# tools

## NetAcad notes grabber

1. Open the course on netacad.com → **Content** tab (course outline visible).
2. DevTools → Console → paste `netacad-grab.js` → Enter.
   It clicks through every module, reads each module's Adapt JSON with your session and downloads `netacad-<course>.json`.
   Quizzes, exams and Packet Tracer files are skipped.
3. `python3 tools/netacad/netacad-to-md.py ~/Downloads/netacad-<course>.json raw/<course>/`

`raw/` is gitignored — it's Cisco's own text. Condensed notes live in `01 Predmety/Informačné a sieťové technológie/CCNA2 – SRWE/`.
