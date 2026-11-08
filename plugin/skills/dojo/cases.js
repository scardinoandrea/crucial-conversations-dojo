// Single source of truth for the dojo's practice data.
// Loaded by index.html via <script src> (classic script, so it works on file://
// too) and read as text by the Claude skill in this same folder (SKILL.md).
// Top-level consts in a classic script are shared with later classic scripts.
const CASES = [
  { title:"The Silent Merge",
    shared:"Last night Alex merged a PR into main that changes the state-management pattern for a shared component — without waiting for Jordan's review. Jordan finds out this morning, the day before going on two weeks of PTO.",
    A:{label:"Alex", text:"You merged because the sprint deadline is Friday and QA needs two full days to test. Jordan has left review requests sitting for over a week on three separate occasions this month, and you were genuinely worried this would slip again with Jordan about to disappear for two weeks. You also privately think Jordan's reviews have gotten slower and more nitpicky lately, to the point where it's affecting delivery, but you've never said that directly."},
    B:{label:"Jordan", text:"You've been slower reviewing Alex's PRs since a race condition in one of Alex's changes caused a production outage two months ago — a bug you personally got paged for at 2am. Since then you've been deliberately more careful, and you believe that caution is the reason the codebase has been stable since. Finding out this specific PR — touching shared state logic — was merged without your review, right before you go unreachable for two weeks, feels like your judgment was overridden and your concern dismissed."}
  },
  { title:"Credit Where It's Due",
    shared:"In yesterday's sprint demo to leadership, Priya presented the new analytics dashboard as \"what my team built,\" without mentioning that Sam wrote roughly 80% of the underlying data-fetching and caching logic that made it possible.",
    A:{label:"Sam", text:"You spent three weekends debugging a nasty caching bug that would have made the dashboard unusable, and Priya knows it because you were pairing on Slack huddles at 11pm together. You don't need public praise, but you're up for a mid-level-to-senior promotion this cycle, and visibility with leadership specifically matters for that case. This isn't the first time Priya has presented team work in the first person singular."},
    B:{label:"Priya", text:"You were nervous going into that leadership demo — it's the first time you've presented to that level of the org, and you were coached beforehand to speak confidently and \"own the outcome\" rather than get lost in a list of contributors. You didn't consciously decide to omit Sam; you were focused on not stumbling through the Q&A. You do genuinely see this as a joint effort and would push back hard if anyone suggested you did the technical work yourself."}
  },
  { title:"The Flaky Test Standoff",
    shared:"The CI pipeline has an end-to-end test that fails intermittently — roughly 30% of runs — blocking releases. Morgan wants to quarantine/skip it immediately to unblock the release train. Deniz refuses, insisting it needs a proper root-cause fix first.",
    A:{label:"Morgan", text:"Product has already slipped this release once, and you're the one fielding angry messages from the account team about a client-visible date. You've seen this exact test flake for over a month with zero visible progress on a fix, and you suspect it's actually masking a real race condition that quarantining won't make worse — it's already effectively being ignored by everyone re-running CI three times to get green."},
    B:{label:"Deniz", text:"You've traced the flake to a real timing bug in the checkout flow that occasionally also happens in production, just rarely enough that no one's connected it to customer complaints about \"double charges\" support has been getting for weeks. You're worried that quarantining the test makes an actual money-affecting bug invisible again, and you feel like reliability concerns keep losing to deadline pressure on this team."}
  },
  { title:"Tech Debt vs. Deadline",
    shared:"The PM wants a new checkout feature shipped by Friday for a marketing commitment already made externally. Casey believes the only realistic way to hit that date is to hardcode logic that bypasses the team's design system and validation layer. Riley, the informal tech lead, says that's not acceptable.",
    A:{label:"Casey", text:"You already scoped the \"proper\" way and it's an 8-10 day effort minimum — you did that estimate yourself two days ago. Nobody told you about the external marketing commitment until yesterday. You feel caught between a PM who overpromised and a tech lead who wasn't in the room when that promise was made, and you're the one who'll be blamed either way this goes."},
    B:{label:"Riley", text:"Six months ago the team shipped a similarly \"just this once\" hardcoded shortcut in the pricing flow, and it's caused two production incidents and roughly three weeks of cumulative firefighting since — you have the incident tickets to prove it. You weren't looped into the marketing commitment either, and you're frustrated this is being framed as an engineering delay rather than a sales/PM commitment problem."}
  },
  { title:"Who Broke Prod",
    shared:"A production incident happened overnight. The postmortem hasn't started yet, but this morning in the team Slack channel, Amir posted a message implying the outage was caused by a config change Jamie pushed yesterday.",
    A:{label:"Jamie", text:"You did push a config change yesterday, but it was reviewed and approved by two people, deployed at 2pm, and had zero errors for six hours before the incident started at 8pm — well after Amir's feature flag rollout went out to 50% of production traffic at 7:45pm. You already suspect it's Amir's rollout, but you don't have full log access to prove it yet, and you're angry Amir posted blame publicly before anyone looked at the data."},
    B:{label:"Amir", text:"Your feature flag rollout has shipped cleanly to production four times before with no issues, so your instinct was that the newer, less-tested change (Jamie's config push) was the more likely cause. You posted in Slack mostly to get eyes on it fast during an active incident, not to assign blame — but you can see now, in hindsight, how it read that way, and you haven't looked closely enough yet to rule out your own rollout."}
  },
  { title:"The Ghost Reviewer",
    shared:"Sasha approves nearly every PR with just \"LGTM 👍\" within two minutes of it being opened. Priya, the team lead, needs thorough reviews to be defensible for an upcoming SOC 2 audit and has said so in a team meeting, but nothing has changed.",
    A:{label:"Sasha", text:"You've quietly been reading PRs mostly on the diff preview in Slack notifications and trust your teammates' code — you've caught real bugs before by skimming, and you think the \"thorough review\" ask is more about audit theater than actual code quality, since the audit checklist just needs a review to exist, not a transcript of what was checked. You also have the highest PR-throughput on the team and are quietly proud of not being a bottleneck."},
    B:{label:"Priya", text:"You were told directly by the compliance consultant that \"LGTM\" with no comments, on a PR reviewed in under two minutes, is very likely to be flagged as a rubber-stamp control during the actual audit interview, which could affect the company's SOC 2 certification timeline and a client contract that depends on it. You haven't explained the audit mechanics in detail to Sasha, and you're aware this might look like you're questioning Sasha's competence rather than a compliance requirement."}
  },
  { title:"Remote vs. In-Office Bias",
    shared:"Tara works remote full-time; Ben is in the office four days a week. Tara feels decisions keep getting made in hallway/in-person conversations that never make it back to Slack. Ben feels Tara has become slow to respond and disengaged over the last month.",
    A:{label:"Tara", text:"Twice in the last three weeks you found out about architecture decisions after the fact, once from a Confluence page that was already merged. You've started responding more slowly in Slack partly because you've stopped trusting that async input actually gets weighted the same as in-room input, so it feels less worth the effort — though you haven't said that out loud."},
    B:{label:"Ben", text:"You didn't think of the hallway conversations as \"decisions\" — more like brainstorming that happened to include two people who were already talking about something else, and you assumed things would get properly proposed in Slack or a doc afterward before being final. You've noticed Tara taking 1-2 days to respond to direct questions recently and have started routing time-sensitive things to in-office people instead, which you know now might be making the problem worse."}
  },
  { title:"The Solo Refactor",
    shared:"Over what was scoped as a two-week \"cleanup sprint,\" Devon quietly rewrote a core shared module to strict TypeScript, restructuring its public API. It's now breaking roughly a dozen in-flight branches across the team.",
    A:{label:"Devon", text:"You raised the idea of strict-mode migration in a team doc three months ago and got two thumbs-up emoji reactions and no discussion, which you took as approval. You genuinely believe this prevents a class of bugs that has caused at least two production incidents this year, and you're proud of the work — you weren't trying to blindside anyone, you assumed people would rebase as needed like any other shared-module change."},
    B:{label:"the team lead reviewing this with Devon", text:"You have four engineers currently blocked mid-feature because their branches won't compile against the new API, with no migration guide provided. Two emoji reactions on a doc three months ago is not what you'd call a team decision, and you're now going to have an uncomfortable conversation with the PM about why velocity dropped this week with no clear external cause. You also don't want to crush Devon's initiative, because the underlying technical instinct was probably right."}
  }
];

// Chapter -> tools introduced, 3rd edition order.
const CHAPTER_META = {
  1:"Ch. 1 — What's a Crucial Conversation?",
  2:"Ch. 2 — Mastering Crucial Conversations",
  3:"Ch. 3 — Choose Your Topic",
  4:"Ch. 4 — Start with Heart",
  5:"Ch. 5 — Master My Stories",
  6:"Ch. 6 — Learn to Look",
  7:"Ch. 7 — Make It Safe",
  8:"Ch. 8 — STATE My Path",
  9:"Ch. 9 — Explore Others' Paths",
  10:"Ch. 10 — Retake Your Pen",
  11:"Ch. 11 — Move to Action",
  12:"Ch. 12 — Yeah, But",
  13:"Ch. 13 — Putting It All Together"
};

const DEBRIEF_BLOCKS = [
  { ch:1, title:"Notice It's Crucial", items:[
    "We paused to actually recognize this as a crucial conversation — opinions differ, stakes are real, emotions are running — instead of pretending it wasn't a big deal.",
    "Neither of us defaulted straight to Avoid it, or to Handle it badly and blow up/clam up, without noticing we had a third option."
  ]},
  { ch:2, title:"Dialogue, Not Silence or Violence", items:[
    "I worked on myself first instead of trying to fix, control, or diagnose the other person.",
    "I noticed if either of us slipped into silence (masking, avoiding, withdrawing) or violence (controlling, labeling, attacking) instead of staying in dialogue.",
    "I stayed focused on adding to the shared pool of meaning rather than trying to win."
  ]},
  { ch:3, title:"Choose Your Topic (CPR)", items:[
    "We were actually discussing the right issue — I checked whether this is a one-off Content problem, a repeated Pattern, or about the Relationship itself.",
    "If several issues were tangled together, we picked one and named it clearly instead of dumping everything on the table at once."
  ]},
  { ch:4, title:"Start with Heart", items:[
    "Before diving in, I got clear on what I really want — for myself, for the other person, and for the relationship.",
    "I refused the Sucker's Choice (assuming it's either be honest OR be kind, either get results OR keep the peace) and looked for a way to do both.",
    "I checked I wasn't just trying to win, punish, or avoid conflict."
  ]},
  { ch:5, title:"Master My Stories", items:[
    "I separated what I actually observed (fact) from the story/interpretation I built on top of it, out loud.",
    "I noticed if I'd cast the other person as a villain, myself as a victim, or the situation as one where I'm helpless — and questioned that story.",
    "I retraced my path: from the objective facts, to the story I told myself, to the feeling it created, to the action I was about to take — and checked each link."
  ]},
  { ch:6, title:"Learn to Look", items:[
    "I watched for when the conversation became unsafe, not just what was being said — tone, pace, body language.",
    "I noticed early signs of silence (sarcasm, changing the subject, going quiet) or violence (interrupting, absolute language, dramatic gestures) in either of us."
  ]},
  { ch:7, title:"Make It Safe", items:[
    "When safety broke, I stepped out of the content and rebuilt safety before continuing.",
    "I checked for Mutual Purpose (do we both believe we're working toward the same outcome?) and Mutual Respect before pushing my view further.",
    "I apologized if appropriate, or used Contrast (\"I don't mean X, I do mean Y\") to fix a misunderstanding.",
    "If purposes seemed to genuinely conflict, I used CRIB: Committed to seek mutual purpose, Recognized the purpose behind their strategy, Invented a mutual purpose, Brainstormed new strategies."
  ]},
  { ch:8, title:"STATE My Path", items:[
    "Share: I led with the facts, before conclusions.",
    "Tell: I told my story tentatively (\"I'm concluding...\" not \"The truth is...\").",
    "Ask: I asked for the other person's facts and story before defending mine.",
    "Talk tentatively: I left room for being wrong.",
    "Encourage testing: I actually invited disagreement, and meant it."
  ]},
  { ch:9, title:"Explore Others' Paths (AMPP)", items:[
    "Ask: I genuinely invited the other person to share their view.",
    "Mirror: I acknowledged their emotion when it would help them feel safe sharing more.",
    "Paraphrase: I restated their point in my own words to show I understood it, before responding to it.",
    "Prime: if they were still holding back, I offered a guess at what they might be thinking or feeling to get the ball rolling.",
    "When we agreed, I built on it; when we differed, I compared paths rather than assuming one of us must be wrong."
  ]},
  { ch:10, title:"Retake Your Pen", items:[
    "After hearing a difficult or troubling story from the other person, I consciously chose how to interpret and respond to it rather than reacting on autopilot.",
    "I checked whether the meaning I was about to assign to what they said was the most useful one available, not just the first one that came to mind."
  ]},
  { ch:11, title:"Move to Action", items:[
    "We were explicit about how the decision would actually get made (command, consult, vote, or consensus) rather than assuming.",
    "We closed with clear Who does What, by When, and How we'll follow up."
  ]},
  { ch:12, title:"Yeah, But — Hard Cases", items:[
    "If the other person was highly emotional, silent, or dishonest, I adapted the tools rather than abandoning them or forcing a script.",
    "I recognized which specific failure mode was happening (blowing up, shutting down, telling half-truths) and named it rather than just pushing through."
  ]}
];
