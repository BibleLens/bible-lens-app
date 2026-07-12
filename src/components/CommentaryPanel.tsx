"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { CommentaryChunk } from "@/lib/commentary";
import { RELATED_PASSAGES, CHAPTER_TOPICS, TOPIC_PAGES } from "@/lib/commentary-index";
import { findBookById } from "@/lib/bible-meta";
import { GlassCard } from "@/components/GlassCard";

interface CommentaryResponse {
  book: string;
  chapter: string;
  verse: string | null;
  commentary: CommentaryChunk[];
}

interface CommentaryPanelProps {
  book: string;
  chapter: number;
  initialCommentary?: CommentaryChunk[];
}

interface CommentaryFetchState {
  forKey: string;
  commentary: CommentaryChunk[];
}

export function CommentaryPanel({ book, chapter, initialCommentary }: CommentaryPanelProps) {
  const router = useRouter();
  const chapterKey = `${book}-${chapter}`;
  // Loading/commentary are derived by comparing fetchState.forKey with the
  // current chapter — no synchronous setState inside the effect body
  const [fetchState, setFetchState] = useState<CommentaryFetchState>(
    initialCommentary && initialCommentary.length > 0
      ? { forKey: chapterKey, commentary: initialCommentary }
      : { forKey: "", commentary: [] }
  );

  const buildPassageQuestion = (): string => {
    const bookTitle = book.charAt(0).toUpperCase() + book.slice(1);
    if (book === "genesis") {
      if (chapter === 15) {
        return `What is the significance of the covenant cutting ceremony in Genesis 15 — why does only God walk between the pieces, and what did the self-maledictory oath mean to the original audience?`;
      }
      if (chapter === 18) {
        return `Who were the three visitors at Mamre in Genesis 18, and what does heavenly court theology tell us about how Yahweh's messengers functioned in the ancient Near East?`;
      }
      return `What does ${bookTitle} ${chapter} mean for understanding creation?`;
    }
    if (book === "matthew") {
      if ([1, 2].includes(chapter)) {
        return `What does Matthew's formula quotation pattern reveal about ancient typological reading — and why does the difference between almah and parthenos in Isaiah 7:14 matter less than what Matthew is doing hermeneutically with the text?`;
      }
      if ([5, 6, 7].includes(chapter)) {
        return `What does 'do not think I have come to abolish the Law' mean in Second Temple context — and how does the Sermon on the Mount's antitheses structure function as Torah intensification, not Torah replacement?`;
      }
      if (chapter === 13) {
        return `What is the mashal genre in Second Temple Judaism — and why does Matthew 13 begin with the insider/outsider structure of the mysterion ton ouranon before giving any parable content?`;
      }
      if ([24, 25].includes(chapter)) {
        return `What does 'this generation will not pass away until all these things have happened' mean — and how does the Daniel 7:13 background reshape what 'the Son of Man coming on the clouds' describes in Matthew 24?`;
      }
      if (chapter === 28) {
        return `What does 'all authority has been given to me' reveal about the shaliach commissioning structure — and why does the passive verb edothē change how we read both the authority claim and the baptismal formula that follows?`;
      }
      return `What is the historical context of ${bookTitle} ${chapter}?`;
    }
    if (book === "revelation") {
      return `What does ${bookTitle} ${chapter} reveal about first-century events through ancient Jewish apocalyptic imagery?`;
    }
    if (book === "isaiah") {
      if (chapter === 1) {
        return `What is the rib covenant lawsuit genre in Isaiah 1 — how does the ancient treaty lawsuit form transform the meaning of every word Isaiah speaks, including verse 18?`;
      }
      if (chapter === 2) {
        return `What does Isaiah 2's vision of the mountain of the LORD describe — and why do the peaceful conditions in verses 2-4 match Isaiah 11 and 65 rather than the eternal state?`;
      }
      if (chapter === 6) {
        return `What did the seraphim and the trisagion mean to Isaiah's original audience — and what does the ANE throne-guardian tradition reveal about the 'holy, holy, holy' declaration?`;
      }
      if (chapter === 40) {
        return `What does 'comfort, comfort my people' mean as a heavenly court commissioning scene — and why is the 'voice crying in the wilderness' announcing a new exodus that will surpass the first?`;
      }
      if ([42, 43].includes(chapter)) {
        return `What is the Servant Song in this chapter — and how do the trial speeches, the ani hu declarations, and the bruised-reed method of mishpat reshape what 'justice to the nations' means?`;
      }
      if ([44, 45].includes(chapter)) {
        return `Why does YHWH call the Persian emperor Cyrus his mashiach — and what does the idol polemic satire reveal about the Babylonian mis pi ritual that Isaiah is dismantling?`;
      }
      if ([49, 50].includes(chapter)) {
        return `What happens when the servant is named 'Israel' yet sent to Israel — and what does the limmud tongue of the Third Song reveal about prophetic authority through morning-by-morning discipline?`;
      }
      if ([54, 55].includes(chapter)) {
        return `What does YHWH's marriage metaphor and the covenant banquet invitation mean to exiles in Babylon — and why is 'come buy without price' counter-programming against the Babylonian temple economy?`;
      }
      return `What did Isaiah ${chapter} mean to the original audience — and how does it connect to New Testament fulfillment?`;
    }
    if (book === "exodus") {
      if (chapter === 3) {
        return `What did it mean when God introduced himself as 'ehyeh asher ehyeh' at the burning bush — and why does the original Hebrew suggest a promise of presence rather than a statement about eternal self-existence?`;
      }
      if (chapter === 12) {
        return `What was the Passover before it became a Christian symbol? How does the ancient Near Eastern apotropaic blood-ritual context reshape what the original audience understood about the night of deliverance?`;
      }
      if (chapter === 14) {
        return `How does the divine warrior motif and ancient combat myth tradition illuminate the Sea crossing — and what does 'Yam Suph' actually refer to in the original text?`;
      }
      if ([19, 20].includes(chapter)) {
        return `How does the Hittite suzerainty treaty structure frame the Sinai covenant — and what changes when we read the Decalogue as treaty stipulations rather than a universal ethics list?`;
      }
      if ([25, 26, 27].includes(chapter)) {
        return `What is the cosmic temple theology behind the Tabernacle — and how do the mishkan, the kapporet, and the three-zone sacred architecture mirror the created order described in Genesis 1?`;
      }
      if ([32, 33, 34].includes(chapter)) {
        return `Why are the Thirteen Attributes of Exodus 34:6-7 considered the theological center of the Hebrew Bible — and how does the golden calf crisis redefine the covenant relationship?`;
      }
      return `What is the historical context of ${bookTitle} ${chapter}?`;
    }
    if (book === "zechariah") {
      if ([1, 2, 3].includes(chapter)) {
        return `What were Zechariah's night visions actually about — and why does the historical context of 519 BCE Persian-period Yehud change how we read the colored horses, the divine court trial, and the Branch oracle?`;
      }
      if ([4, 5, 6].includes(chapter)) {
        return `What do the lampstand, the flying scroll, and the crown oracle reveal about the dual leadership of post-exilic Yehud — and why is the bnei-yitzhar designation for Zerubbabel and Joshua significant?`;
      }
      if ([7, 8].includes(chapter)) {
        return `How does Zechariah's response to the Bethel fasting delegation connect to the prophetic cult-critique tradition from Amos through Jeremiah — and what is the eschatological significance of fasts becoming feasts?`;
      }
      if ([9, 10, 11].includes(chapter)) {
        return `What did the ancient Near Eastern donkey-vs-warhorse contrast communicate about the peaceful king of Zechariah 9 — and how does the shepherd allegory with its thirty silver pieces connect to Matthew 27:9?`;
      }
      if ([12, 13, 14].includes(chapter)) {
        return `What is the Hadad Rimmon mourning context behind the pierced one of Zechariah 12:10, what does the MT/LXX textual variant reveal, and how does the Day of the LORD in chapter 14 relate to both 70 CE and eschatological hope?`;
      }
      return `What is the historical context of ${bookTitle} ${chapter}?`;
    }
    if (book === "ezekiel") {
      if ([1, 2, 3].includes(chapter)) {
        return `What did Ezekiel's chariot vision mean to the original exilic audience — the chayot, ophanim, and the kabod of YHWH?`;
      }
      if (chapter === 28) {
        return `Is Ezekiel 28 about Satan or a human king? What did the heavenly court imagery mean to Ezekiel's original audience?`;
      }
      if (chapter === 37) {
        return `What does Ezekiel 37's valley of dry bones mean? How does the text interpret itself at verse 11?`;
      }
      if ([38, 39].includes(chapter)) {
        return `Who is Gog of the land of Magog in Ezekiel ${chapter}, and how does this connect to Revelation 20:8?`;
      }
    }
    if (book === "jeremiah") {
      if (chapter === 1) {
        return `What is the berufungsbericht — the 'call narrative' genre — in Jeremiah 1, and why does yadati in verse 5 function as a commissioning verb rather than a statement about universal pre-birth existence?`;
      }
      if (chapter === 7) {
        return `What did the Tel Seilun destruction layer at ancient Shiloh mean for Jeremiah's temple sermon — and how does the archaeological evidence of Shiloh's destruction reshape what 'do not trust in deceptive words' meant to the original audience?`;
      }
      if ([18, 19].includes(chapter)) {
        return `How does the potter's house diptych of Jeremiah 18-19 establish conditional vs. irrevocable covenant logic — and what does the ANE suzerain-vassal treaty framework reveal about why one pot can be reshaped while another must be smashed?`;
      }
      if (chapter === 23) {
        return `What does tzemach tsaddiq mean — and why is the Zedekiah name-contrast (Tsidqiyahu = 'YHWH is my righteousness') the primary interpretive key for the Jeremiah 23 Branch oracle?`;
      }
      if (chapter === 29) {
        return `What does darash shalom mean as an active mandate — and why does the exile letter of Jeremiah 29 address a specific community in 597 BCE Babylon rather than offering a universal promise to modern readers seeking prosperity?`;
      }
      if (chapter === 31) {
        return `Why is berit chadasha a hapax legomenon — appearing only once in the entire Hebrew Bible — and what does the two-house address ('house of Israel AND house of Judah') reveal about who the new covenant was originally made with?`;
      }
      if (chapter === 36) {
        return `What does the story of Baruch the scribe and the burning scroll reveal about how prophetic texts were transmitted — and how does 're-dictated with additions' (Jer 36:32) describe the same compositional growth process Jeremiah 36 itself documents?`;
      }
      if (chapter === 52) {
        return `Why does Jeremiah 52 begin immediately after the editorial marker 'the words of Jeremiah end here' at 51:64 — and what does the near-verbatim parallel with 2 Kings 25 reveal about the Deuteronomistic appendix's function in the book?`;
      }
      return `What is the historical context of Jeremiah ${chapter}?`;
    }
    if (book === "psalms") {
      if ([2, 110].includes(chapter)) {
        return `What does the ANE coronation adoption formula reveal about Psalm ${chapter} -- and why is the distinction between adoni and adonai critical for understanding how the New Testament cites this psalm?`;
      }
      if ([8, 139].includes(chapter)) {
        return `What does Psalm ${chapter} reveal about the ancient Israelite understanding of creation and divine presence -- and how does the ruach vocabulary connect to the cosmic temple framework?`;
      }
      if ([22, 89].includes(chapter)) {
        return `What does the lament structure of Psalm ${chapter} reveal about how ancient Israel processed theological crisis -- and why does the genre logic matter more than the New Testament citations?`;
      }
      if (chapter === 23) {
        return `What did the shepherd-king metaphor communicate in ancient Near Eastern royal ideology -- and why does tsalmaveth mean 'deep darkness' rather than 'shadow of death'?`;
      }
      if (chapter === 45) {
        return `How does the Hebrew grammar of Psalm 45:6 allow both the vocative reading ('Your throne, O God') and the predicate analysis ('Your throne is God-like') -- and why do both readings matter?`;
      }
      if (chapter === 51) {
        return `What does ruach mean in Psalm 51's three distinct uses -- and how does the penitential tradition connect to the Thirteen Attributes of Exodus 34?`;
      }
      if (chapter === 82) {
        return `Who are the elohim being judged in Psalm 82's heavenly court -- and how does ke-adam ('like mortals') prove these beings are non-human members of YHWH's council?`;
      }
      return `What is the historical context of ${bookTitle} ${chapter}?`;
    }
    if (book === "job") {
      if ([1, 2].includes(chapter)) {
        return `What was actually happening in Job's heavenly court opening — who is ha-satan, and how does the prosecuting-attorney role differ from the later theological concept of Satan?`;
      }
      if (chapter === 3) {
        return `What is the theological significance of Job 3's opening lament — and why does the 'why was I born?' protest represent legitimate grief rather than sinful rebellion in the wisdom literature tradition?`;
      }
      if (chapter === 19) {
        return `What does the Hebrew word goel mean in Job 19:25 — and how does the legal advocate trajectory from Job 9:33 through 16:19 to 19:25 change what the 'Redeemer who lives' is actually saying?`;
      }
      if (chapter === 28) {
        return `What is the three-strophe mining illustration doing in Job 28 — and why does the 'fear of the Lord is wisdom' conclusion of the Hymn to Wisdom function as the book's own answer before the divine speeches arrive?`;
      }
      if ([38, 39].includes(chapter)) {
        return `What is YHWH actually saying in the divine speeches of Job 38-39 — and why do these cosmic questions about creation reframe Job's suffering without answering it directly?`;
      }
      if ([40, 41].includes(chapter)) {
        return `Who are Behemoth and Leviathan in Job 40-41 — and what does the Ugaritic Lotan cognate and the Chaoskampf tradition reveal about why YHWH uses chaos creatures to answer Job's complaint?`;
      }
      if (chapter === 42) {
        return `What does YHWH's verdict in Job 42:7 actually say about retribution theology — and why does restoring Job not vindicate the friends' argument that suffering always indicates sin?`;
      }
    }
    if (book === "proverbs") {
      if ([1, 7].includes(chapter)) {
        return `What is the bridal-courtship spine of Proverbs 1-9 — and why does the father's instruction to court Woman Wisdom function as a theological frame, not just a metaphor?`;
      }
      if (chapter === 8) {
        return `What is the ANE Maat parallel behind Woman Wisdom's cosmogonic speech in Proverbs 8 — and why does the Hebrew qanah in 8:22 point to bridal-acquisition language rather than creation (Arian) or eternal possession (Nicene)?`;
      }
      if (chapter === 10) {
        return `What does the shift from instruction discourse to antithetical sentence proverbs in Proverbs 10 reveal — and why is the deed-consequence framework observational wisdom rather than a guarantee from God?`;
      }
      if (chapter === 16) {
        return `How does Proverbs 16:9 ('The heart of man plans his way, but YHWH establishes his steps') function as the theological center of the royal wisdom cluster — and what does it reveal about YHWH's sovereignty over human plans?`;
      }
      if ([22, 23].includes(chapter)) {
        return `What is the Amenemope literary dependency in Proverbs 22:17-24:22 — and why does the shalishim ('thirty') of verse 20 directly parallel the thirty chapters of the Egyptian wisdom text on BM Papyrus 10474?`;
      }
      if (chapter === 25) {
        return `What does the Hezekian editorial superscription in Proverbs 25:1 reveal about how biblical wisdom was transmitted — and why does the act of copying Solomon's proverbs itself embody the book's own courtship-of-wisdom theology?`;
      }
      if (chapter === 31) {
        return `How does the eshet chayil of Proverbs 31 close the bridal-courtship spine opened in chapter 1 — and why does chayil (military valor) refuse to let the poem become a domesticity prescription?`;
      }
      return `What is the historical context of ${bookTitle} ${chapter}?`;
    }
    if (book === "ecclesiastes") {
      if ([1, 2].includes(chapter)) {
        return `What does hebel — vapor, breath, fleeting — actually mean in Ecclesiastes, and why does the difference between 'meaningless' and 'vapor' reshape the entire book? How does the royal experiment of chapters 1-2 test whether wisdom, pleasure, or toil can resolve the hebel problem?`;
      }
      if (chapter === 3) {
        return `What does 'a time for everything' mean in its ancient context — are the fourteen antithetical pairs a divine masterplan or an observation about the rhythms of the human condition? And what does olam in 3:11 actually mean when the emphasis falls on 'yet they cannot fathom'?`;
      }
      if ([5, 6].includes(chapter)) {
        return `What does Qoheleth's temple speech in Ecclesiastes 5 reveal about ancient Israelite vow theology — and why does the wealth critique of chapters 5-6 distinguish between having much and enjoying one's portion (heleq)?`;
      }
      if ([7, 8].includes(chapter)) {
        return `What does the 'who can find out?' refrain reveal about wisdom's limits in Ecclesiastes 7-8 — and why does 8:15's joy command ('I commend enjoyment') function as positive ANE creaturely wisdom anchored in the Gilgamesh Siduri speech tradition?`;
      }
      if ([9, 10, 11, 12].includes(chapter)) {
        return `What does 'the living know that they will die, but the dead know nothing' mean in its original context — and how does the aging allegory of chapter 12, where 'the spirit returns to God who gave it,' reverse Genesis 2:7 rather than promise conscious afterlife?`;
      }
      return `What is the historical context of ${bookTitle} ${chapter}?`;
    }
    if (book === "john") {
      if (chapter === 1) {
        return `What did John's Prologue mean to its original audience — and why does the logos in John 1:1 connect to the Jewish Wisdom tradition of Proverbs 8 and Sirach 24 rather than Greek philosophical logos?`;
      }
      if ([2, 3, 4].includes(chapter)) {
        return `What do the early signs and encounters in John 2-4 reveal about the 'sent one' framework — and what did the Nicodemus conversation and the Samaritan woman encounter share in their offer of 'life from above' vs 'living water'?`;
      }
      if ([5, 6].includes(chapter)) {
        return `How does John 5's agency defense (5:19-30) answer the 'equal with God' charge — and why does 5:23's honor-authorization clause resolve the proskyneo coherence question that runs through the entire Gospel?`;
      }
      if ([7, 8].includes(chapter)) {
        return `What is the ego eimi claim of John 8:58 — and how does Bauckham's divine-identity argument differ from a Nicene ontological claim, and why does the shaliach model offer a better reading of the trial-speech context?`;
      }
      if ([9, 10].includes(chapter)) {
        return `What does 'I and the Father are one' in John 10:30 actually claim — and how does Jesus's Psalm 82 argument (10:34-36) function within the shaliach agency model?`;
      }
      if ([11, 12].includes(chapter)) {
        return `What does John 12:41 mean when it says Isaiah saw Jesus's glory — and how does the agency model account for Isaiah seeing YHWH's kabod in Isaiah 6 while John identifies it with Jesus?`;
      }
      if (chapter === 13) {
        return `What does the foot washing in John 13 reveal about the glorification theology of the Book of Glory — and why does the new commandment follow immediately after Judas's departure and the 'Now is the Son of Man glorified' declaration?`;
      }
      if ([14, 15, 16].includes(chapter)) {
        return `What are the four Paraclete passages in John 14-16 — and why does the delegated-authority pattern ('he will not speak on his own') place the Paraclete within the agency-commission structure rather than as an independent divine person?`;
      }
      if (chapter === 17) {
        return `What does 'eternal life is knowing you, the only true God, and Jesus Christ whom you sent' mean for Trinitarian theology — and why did Augustine acknowledge the plain-sense pressure of this verse even as he argued for Trinitarian interpretation?`;
      }
      if ([18, 19].includes(chapter)) {
        return `What happened when soldiers fell back at the Garden arrest in John 18:6 — and how does the 'I am he' response function as an echo of YHWH's trial-speech formula without requiring a claim to ontological identity with the Father?`;
      }
      if ([20, 21].includes(chapter)) {
        return `What does Thomas's confession 'my Lord and my God' in John 20:28 mean — and how do the narrative context (20:30-31 purpose statement), the same-chapter bracket (20:17 'my God and your God'), and the Psalm 35:23 doxological parallel reshape what Thomas is actually saying?`;
      }
      return `What does John ${chapter} reveal about the agency Christology running through the Fourth Gospel?`;
    }
    if (book === "romans") {
      if ([1, 3].includes(chapter)) {
        return `What did Paul mean by pistis Christou in Romans 3:22 — and why does reading it as 'the faithfulness of the Anointed One' (subjective genitive) rather than 'faith in Christ' (objective genitive, as the BSB renders it) reshape the entire argument of Romans 1-3 about how God's righteousness is revealed?`;
      }
      if ([5, 6].includes(chapter)) {
        return `How does Paul's Adam-Christ typology in Romans 5:12-21 work — and why does the baptism-as-covenant-death framework in Romans 6 connect the believer's identity to Israel's Exodus crossing rather than to a sacramental ritual?`;
      }
      if (chapter === 8) {
        return `What are the pneuma genitives in Romans 8:9-11 ('Spirit of God,' 'Spirit of Christ,' 'Christ in you') — and why does reading them as functional descriptions of God's empowering presence rather than as references to a distinct divine person change how we understand Paul's adoption (huiothesia) theology?`;
      }
      if ([9, 10, 11].includes(chapter)) {
        return `How does Paul's olive tree metaphor in Romans 11 reframe election as corporate and covenantal rather than individual — and why does the punctuation of Romans 9:5 matter for whether Paul is calling Jesus 'God over all' or offering a separate doxology to the Father?`;
      }
      if ([13, 15, 16].includes(chapter)) {
        return `What was the political context of Romans 13:1-7 during Nero's quinquennium — and why does Paul's commendation of Phoebe as prostatis (patron/leader) in Romans 16:1-2 reveal more about early church leadership than most English translations suggest?`;
      }
      return `What is the historical context of Romans ${chapter}?`;
    }
    if (book === "galatians") {
      if ([1, 2].includes(chapter)) {
        return `What did Paul mean when he told Peter 'you are a hypocrite' at Antioch — and why does the compressed antithesis of pistis Christou (twice) and erga nomou (three times) in Galatians 2:16 create the strongest tautology argument for reading 'the faithfulness of Christ' rather than 'faith in Christ'? How does the Antioch incident prove that 'works of the law' meant ethnic boundary markers — table fellowship, food purity — not moral effort?`;
      }
      if (chapter === 3) {
        return `What was a paidagogos in the Greco-Roman world — and why does correcting the translation from 'teacher' to 'slave-guardian' change everything about Paul's argument in Galatians 3:24-25? How does the midrashic reading of Abraham's 'seed' (singular = Christ) in Gal 3:16 ground Gentile inclusion in the Abrahamic promise rather than Torah observance?`;
      }
      if (chapter === 4) {
        return `What are the stoicheia tou kosmou — the 'elemental things of the world' — in Galatians 4:3 and 4:9, and why do scholars disagree on whether Paul means elementary religious principles, physical elements, or spiritual beings? How does huiothesia (adoption) in Gal 4:5 differ from the same word in Romans 8:15 — and why does the Hagar/Sarah allegory invert the expected identification?`;
      }
      if ([5, 6].includes(chapter)) {
        return `Why do the 'works of the flesh' in Galatians 5:19-21 include social sins like enmity, strife, jealousy, and factions — and what does that tell us about why sarx cannot mean 'physical body' in Paul's usage? How does the kaine ktisis (new creation) of Gal 6:15 connect to Isaiah 65-66, and why is the 'Israel of God' in Gal 6:16 one of the most contested phrases in the Pauline corpus?`;
      }
      return `What is the historical context of ${bookTitle} ${chapter}?`;
    }
    if (book === "hebrews") {
      if ([1, 2].includes(chapter)) {
        return `What does charaktēr — the exact imprint a die stamps onto a coin — reveal about how the author of Hebrews understood the Son's relationship to God? Murray Harris argues Hebrews 1:8 is a direct vocative address to Jesus as 'God' — but what does the very next verse ('your God has anointed you') do to that reading, and why does the Psalm 45 royal wedding context matter for understanding the entire OT catena of Hebrews 1:5-14?`;
      }
      if ([3, 4].includes(chapter)) {
        return `What is the katapausis — the rest — that Joshua's conquest did not complete, and why does the author of Hebrews coin a new word, sabbatismos, to describe what remains for the people of God? How does Psalm 95's liturgical 'today, if you hear his voice' become a weapon of pastoral urgency in Hebrews 3-4, and what does apistia mean here — intellectual doubt or covenantal unfaithfulness?`;
      }
      if ([5, 6, 7].includes(chapter)) {
        return `How does the textual silence of Genesis 14 — no father, no mother, no genealogy for Melchizedek — become the foundation for an entirely different kind of priesthood? What does the Greek wordplay pathōn/emathen ('he suffered, he learned') in Hebrews 5:8 reveal about the developmental Christology of a Son who 'learned obedience through what he suffered' — and why does the Qumran scroll 11QMelchizedek show that Second Temple Judaism was already reading this figure as an eschatological deliverer?`;
      }
      if ([8, 9, 10].includes(chapter)) {
        return `Why does the author quote the entire Jeremiah 31:31-34 new covenant oracle — the longest OT quotation in the NT — and what does the Greek memphetai in Hebrews 8:8 reveal about who is actually at fault: the covenant or the people? How does the Yom Kippur typology work when the author argues the earthly sanctuary was always a typos — a copy of the heavenly original — and what does ephapax ('once for all') mean set against the annual repetition of the Day of Atonement?`;
      }
      if (chapter === 11) {
        return `What does hypostasis mean in Hebrews 11:1 — and why does the same Greek word carry two different senses in the same letter (the ontological-adjacent 'exact imprint' of 1:3 versus the subjective 'confident assurance' of 11:1)? How does the Aqedah — Abraham's near-sacrifice of Isaac in Genesis 22 — become a typological resurrection argument in Hebrews 11:17-19, and what does pistis as elenchos ('conviction of things unseen') reveal about why the faith hall of fame is not a list of people who believed without evidence?`;
      }
      if ([12, 13].includes(chapter)) {
        return `What is the saleuo — the shaking — of Hebrews 12:26-27 that removes the shakeable things and leaves the unshakeable kingdom? The author alludes to Haggai 2:6 — but does the shaking describe a future cosmic dissolution or the removal of old covenant institutions in 70 CE? How does the Sinai/Zion contrast of Hebrews 12:18-24 function as the letter's rhetorical climax, and what does paideia — discipline as son-formation, not slave-punishment — reveal about the purpose of suffering in the author's theology?`;
      }
      return `What is the historical context of ${bookTitle} ${chapter}?`;
    }
    return `What is the historical context of ${bookTitle} ${chapter}?`;
  };

  const handleAskAboutPassage = () => {
    const question = buildPassageQuestion();
    router.push(`/chat?q=${encodeURIComponent(question)}&t=${Date.now()}`);
  };

  /** Split a flat commentary blob into headed sections with paragraph breaks. */
  const parseCommentarySections = (
    text: string
  ): { heading: string | null; body: string }[] => {
    // Strip leading # title (redundant with "Read our take on this passage" CTA)
    const stripped = text.replace(/^#\s+[^#]+?(?=\s*##)/, "").trim();
    // Split on ## or ### markers
    const parts = stripped.split(/\s*#{2,3}\s+/);
    return parts
      .filter(Boolean)
      .map((section) => {
        // Heading heuristic: a sentence starts where a capitalized word is
        // followed by two+ lowercase words (e.g. "If you've ever", "The name used").
        // Title words like "Cosmic Temple Framework" won't false-match because
        // they're followed by more capitalized words, not lowercase runs.
        // Guard: reject if the "heading" contains sentence-ending punctuation
        // followed by a capitalized word — that indicates body text with a proper
        // noun (e.g. "...period. Bible Lens presents...") not a real heading.
        const match = section.match(
          /^(.+?)\s+([A-Z][a-z]+[.,:;!?']*\s+[a-z][a-z']*\s+[a-z])/
        );
        if (
          match &&
          !/[.!?]\s+[A-Z]/.test(match[1]) &&
          match[1].trim().split(/\s+/).length >= 2
        ) {
          const headingEnd = match.index! + match[1].length;
          return {
            heading: section.substring(0, headingEnd).trim(),
            body: section.substring(headingEnd).trim(),
          };
        }
        return { heading: null, body: section };
      })
      .filter((s) => s.heading || s.body.trim());
  };

  /** Apply inline markdown (bold, italic) to text. */
  const inlineMarkdown = (text: string): string =>
    text
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>");

  /** Split a text block into readable paragraphs. Tries double-newlines first;
   *  if the chunker collapsed them, falls back to splitting every ~3 sentences. */
  const splitIntoParagraphs = (text: string): string[] => {
    const byNewlines = text.split(/\n\n+/).map(s => s.trim()).filter(Boolean);
    if (byNewlines.length > 1) return byNewlines;
    // Chunker joined everything with single spaces — split by sentence groups
    const sentences = text.match(/[^.!?]+[.!?]+(?:\s+|$)/g);
    if (!sentences || sentences.length <= 4) return [text];
    const paragraphs: string[] = [];
    for (let i = 0; i < sentences.length; i += 3) {
      paragraphs.push(sentences.slice(i, i + 3).join("").trim());
    }
    return paragraphs;
  };

  useEffect(() => {
    // Skip client fetch when data was pre-populated by the server (SSR)
    if (initialCommentary && initialCommentary.length > 0) return;

    let cancelled = false;
    const key = `${book}-${chapter}`;

    fetch(`/api/commentary?book=${encodeURIComponent(book)}&chapter=${chapter}`)
      .then((res) => res.json())
      .then((data: CommentaryResponse) => {
        if (!cancelled) setFetchState({ forKey: key, commentary: data.commentary ?? [] });
      })
      .catch(() => {
        if (!cancelled) setFetchState({ forKey: key, commentary: [] });
      });

    return () => {
      cancelled = true;
    };
  }, [book, chapter, initialCommentary]);

  const isLoading = fetchState.forKey !== chapterKey;
  const commentary = isLoading ? [] : fetchState.commentary;

  // Empty state — hide completely, no broken UI
  if (!isLoading && commentary.length === 0) {
    return null;
  }

  // Loading state — subtle shimmer
  if (isLoading) {
    return (
      <GlassCard className="p-5" aria-hidden="true">
        <div className="animate-pulse space-y-3">
          <div className="h-4 w-40 rounded" style={{ background: "rgba(255,255,255,0.05)" }} />
          <div className="h-3 w-full rounded" style={{ background: "rgba(255,255,255,0.05)" }} />
          <div className="h-3 w-5/6 rounded" style={{ background: "rgba(255,255,255,0.05)" }} />
        </div>
      </GlassCard>
    );
  }

  // Related passages content
  const relatedKeys = RELATED_PASSAGES[`${book}-${chapter}`] ?? [];
  const relatedPassagesContent =
    relatedKeys.length > 0 ? (
      <GlassCard as="section" className="p-5 space-y-3">
        <p className="micro-label">Related Passages</p>
        <ul className="space-y-1">
          {relatedKeys.map((relKey) => {
            const [relBook, relChapterStr] = relKey.split("-");
            const relChapter = parseInt(relChapterStr, 10);
            const bookName = findBookById(relBook)?.name ?? relBook;
            return (
              <li key={relKey}>
                <Link
                  href={`/bible/${relBook}/${relChapter}`}
                  className="text-sm text-[var(--color-gold-400)] hover:text-[var(--color-gold-300)] transition-colors"
                >
                  {bookName} {relChapter}
                </Link>
              </li>
            );
          })}
        </ul>
      </GlassCard>
    ) : null;

  // Explore by topic content
  const topicSlugs = CHAPTER_TOPICS[`${book}-${chapter}`] ?? [];
  const topicContent =
    topicSlugs.length > 0 ? (
      <GlassCard as="section" className="p-5 space-y-3">
        <p className="micro-label">Explore by Topic</p>
        <ul className="space-y-1">
          {topicSlugs.map((slug) => {
            const topicTitle = TOPIC_PAGES.find((t) => t.slug === slug)?.title ?? slug;
            return (
              <li key={slug}>
                <Link
                  href={`/topics/${slug}`}
                  className="text-sm text-[var(--color-cyan-400)] hover:text-[var(--color-cyan-300)] transition-colors"
                >
                  {topicTitle}
                </Link>
              </li>
            );
          })}
        </ul>
      </GlassCard>
    ) : null;

  // Content state — glass card cluster layout
  return (
    <div className="space-y-4">
      {/* Section header (RDR-04) */}
      <p className="micro-label" style={{ color: "var(--color-cyan-400)" }}>
        Through This Lens
      </p>

      {/* Commentary sections as glass card clusters (RDR-04) */}
      {commentary.map((chunk, index) => (
        <div key={index} className="space-y-4">
          {parseCommentarySections(chunk.text).map((section, si) => (
            <GlassCard key={si} as="article" className="p-5 space-y-3">
              {section.heading && (
                <p className="micro-label">{section.heading}</p>
              )}
              {section.body.trim() &&
                splitIntoParagraphs(section.body.trim()).map((para, pi) => (
                  <p
                    key={pi}
                    className="commentary-prose text-lg"
                    style={{
                      fontFamily: "Georgia, serif",
                      color: "var(--color-commentary-body, #e2e2e2)",
                      lineHeight: "1.7",
                    }}
                    dangerouslySetInnerHTML={{ __html: inlineMarkdown(para) }}
                  />
                ))}
            </GlassCard>
          ))}
        </div>
      ))}

      {/* Deepen Analysis button (RDR-05) */}
      <button
        type="button"
        onClick={handleAskAboutPassage}
        className="mt-2 w-full px-4 py-3 rounded-none text-base font-medium transition-colors hover:opacity-90 flex items-center justify-center gap-2 cursor-pointer"
        style={{
          background: "rgba(34, 211, 238, 0.08)",
          border: "1px solid rgba(34, 211, 238, 0.3)",
          color: "var(--color-cyan-400)",
        }}
      >
        <span className="micro-label mr-1">Scholar AI</span>
        Deepen Analysis
      </button>

      {/* Related Passages as its own glass card */}
      {relatedPassagesContent}

      {/* Explore by Topic as its own glass card */}
      {topicContent}
    </div>
  );
}
