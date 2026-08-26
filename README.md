# Crucial Conversations Dojo

> 🤖 This tool — code, scenarios, README, all of it — was 100% generated with AI (Claude), based on a mentorship-practice idea and iterative feedback. No hand-written code.

A single-file, no-build practice tool for rehearsing the skills from
*Crucial Conversations: Tools for Talking When Stakes Are High* (3rd ed.,
Patterson, Grenny, McMillan, Switzler) with a colleague or mentee.

## Why this exists

Improvised debates where you're each assigned a random side train
persuasion and rhetoric — the opposite of what the book teaches. Dialogue
skills only show up when there's a genuine gap in information and a real
stake, which is what this tool manufactures on purpose.

## How it works

1. **Pick your chapter level.** Select how far into the book you've read.
   The debrief checklist and prep prompts only show tools introduced up
   to that chapter — nothing from later chapters leaks in, so you're
   practicing what you actually know.
2. **Draw a case.** Each case is a realistic frontend-team conflict with
   a shared, public situation both people can see.
3. **Reveal your role privately.** Each person taps only their own role
   card. The private context is different for each role on purpose —
   that asymmetry is what creates a real disagreement instead of a
   scripted debate. Don't read the other person's card, and don't
   paraphrase yours to them before you talk.
4. **Prep (90s), then talk.** No script — just have the conversation.
5. **Debrief together**, scored against a checklist scoped to your
   current chapter level, not the whole book.
6. **Re-run the same case with roles swapped**, or once you've unlocked
   more chapters, to feel the difference more tools make.

## Running it on two machines

You don't have to share a screen. On the case brief, hit **Copy invite
link** and send it to the other person — the link encodes the case and
the chapter level in the URL hash, so they land on the exact same case
at the same level:

```
https://<host>/#c=5&f=4821&ch=4
```

The link deliberately carries **no role**, so it's safe to paste to
anyone playing: you each pick your own seat on your own screen. Once
you've picked, your private context stays pinned in a sidebar for the
rest of the session, so you can re-read your own file mid-conversation
without navigating away from the timer or the debrief. **Hide contents**
collapses it if you're screen-sharing.

Sync is one-shot, not live: the case and level are shared, but timers
run independently on each machine — start them together out loud. And
the secrecy is trust-based, as it always was. Both roles' text ships in
`index.html` to every browser, so anyone determined to read the other
card via devtools can. Anyone who'd do that has already opted out of
the exercise.

## Running it

No build step, no dependencies. Just open `index.html` in a browser, or
serve the folder with any static file server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Note: on `file://` some browsers block `history.replaceState`, so the
tool falls back to setting the hash directly. Serving over HTTP (or the
deployed URL) avoids that, and the clipboard button needs a secure
context (HTTPS or localhost) to work at all.

No build step, no dependencies. Just open `index.html` in a browser, or
serve the folder with any static file server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Chapter mapping

Based on the 3rd edition (2021) table of contents:

| Ch. | Title |
|----|-------|
| 1  | What's a Crucial Conversation? |
| 2  | Mastering Crucial Conversations |
| 3  | Choose Your Topic |
| 4  | Start with Heart |
| 5  | Master My Stories |
| 6  | Learn to Look |
| 7  | Make It Safe |
| 8  | STATE My Path |
| 9  | Explore Others' Paths |
| 10 | Retake Your Pen |
| 11 | Move to Action |
| 12 | Yeah, But |
| 13 | Putting It All Together |

If you're reading the 2nd edition, the chapter order differs (Start with
Heart is Ch.3, Learn to Look is Ch.4, etc.) — the tool as shipped follows
the 3rd edition order.

## Adding your own cases

Cases live in the `CASES` array near the top of the `<script>` block in
`index.html`. Each one needs a shared public `shared` situation plus
private `A` and `B` context — the more the two private contexts justify
opposing, reasonable positions, the better the practice.

## License

MIT — see [LICENSE](LICENSE).
