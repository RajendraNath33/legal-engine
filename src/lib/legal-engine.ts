export type DraftTemplate = {
  id: string;
  name: string;
  forum: "Supreme Court" | "High Court" | "District Court" | "Consumer Forum" | "Tribunal" | "Notice" | "Bail";
  category: "Civil" | "Criminal" | "Writ" | "Notice" | "Consumer" | "Bail";
  description: string;
  fields: { key: string; label: string; type: "text" | "number" | "textarea" | "date"; placeholder?: string }[];
};

export const DRAFT_TEMPLATES: DraftTemplate[] = [
  {
    id: "ni-138-notice",
    name: "Section 138 NI Act Legal Notice (Dishonour of Cheque)",
    forum: "Notice",
    category: "Notice",
    description: "Statutory notice under Section 138 of the Negotiable Instruments Act, 1881.",
    fields: [
      { key: "senderName", label: "Name / Firm of Sender (Payee)", type: "text", placeholder: "e.g., M/s Shyam Trading Co." },
      { key: "senderAdvocate", label: "Advocate for Sender", type: "text", placeholder: "Adv. R. K. Mehta" },
      { key: "recipientName", label: "Name / Firm of Recipient (Drawer)", type: "text" },
      { key: "recipientAddress", label: "Address of Recipient", type: "textarea" },
      { key: "amount", label: "Cheque Amount (in ₹)", type: "number", placeholder: "500000" },
      { key: "chequeNo", label: "Cheque Number", type: "text" },
      { key: "chequeDate", label: "Cheque Date", type: "date" },
      { key: "bankName", label: "Bank Name", type: "text" },
      { key: "returnDate", label: "Date of Dishonour / Return Memo", type: "date" },
      { key: "causeOfAction", label: "Brief Description of Liability", type: "textarea", placeholder: "Towards discharge of business loan / sale of goods..." },
    ],
  },
  {
    id: "bail-437",
    name: "Regular Bail Application u/s 437 CrPC",
    forum: "District Court",
    category: "Bail",
    description: "Regular bail application before the Sessions / Judicial Magistrate court.",
    fields: [
      { key: "accusedName", label: "Name of Applicant / Accused", type: "text" },
      { key: "fatherName", label: "Father's Name", type: "text" },
      { key: "policeStation", label: "Police Station", type: "text" },
      { key: "firNo", label: "FIR Number", type: "text" },
      { key: "sections", label: "Sections invoked", type: "text", placeholder: "e.g., Sections 420, 406 IPC" },
      { key: "courtName", label: "Court Before Whom", type: "text", placeholder: "Hon'ble Sessions Judge, Delhi" },
      { key: "grounds", label: "Grounds for Bail", type: "textarea", placeholder: "Not a flight risk, willing to cooperate, no prior conviction..." },
    ],
  },
  {
    id: "writ-habeas",
    name: "Writ Petition – Habeas Corpus (Art. 32 / 226)",
    forum: "High Court",
    category: "Writ",
    description: "Petition for issuance of a writ of Habeas Corpus for unlawful detention.",
    fields: [
      { key: "petitioner", label: "Petitioner Name", type: "text" },
      { key: "respondent", label: "Respondent(s)", type: "text", placeholder: "State of XYZ, SHO, PS..." },
      { key: "detenu", label: "Name of Detenu", type: "text" },
      { key: "court", label: "Court", type: "text", placeholder: "High Court of Delhi" },
      { key: "facts", label: "Material Facts / Circumstances of Detention", type: "textarea" },
      { key: "grounds", label: "Grounds", type: "textarea" },
    ],
  },
  {
    id: "consumer-complaint",
    name: "Consumer Complaint – District Consumer Commission",
    forum: "Consumer Forum",
    category: "Consumer",
    description: "Complaint under Section 35 of Consumer Protection Act, 2019.",
    fields: [
      { key: "complainant", label: "Complainant Name & Address", type: "textarea" },
      { key: "oppositeParty", label: "Opposite Party Name & Address", type: "textarea" },
      { key: "product", label: "Product / Service Description", type: "text" },
      { key: "amountPaid", label: "Amount Paid (₹)", type: "number" },
      { key: "defect", label: "Defect / Deficiency Description", type: "textarea" },
      { key: "relief", label: "Relief Sought", type: "textarea" },
    ],
  },
  {
    id: "written-statement",
    name: "Written Statement (Civil Suit, Order VIII CPC)",
    forum: "District Court",
    category: "Civil",
    description: "Written statement to be filed by the Defendant in a civil suit.",
    fields: [
      { key: "suitNo", label: "Suit Number", type: "text" },
      { key: "court", label: "Court", type: "text" },
      { key: "plaintiff", label: "Plaintiff Name", type: "text" },
      { key: "defendant", label: "Defendant Name", type: "text" },
      { key: "plaintAllegations", label: "Summary of Plaintiff's Allegations", type: "textarea" },
      { key: "defence", label: "Defence / Specific Denials", type: "textarea" },
    ],
  },
  {
    id: "slp-sc",
    name: "Special Leave Petition (Supreme Court, Art. 136)",
    forum: "Supreme Court",
    category: "Civil",
    description: "SLP before the Supreme Court of India under Article 136.",
    fields: [
      { key: "petitioner", label: "Petitioner", type: "text" },
      { key: "respondent", label: "Respondent", type: "text" },
      { key: "lowerCourt", label: "Lower Court / Tribunal Order", type: "text", placeholder: "High Court order dated..." },
      { key: "questionOfLaw", label: "Question of Law / Substantial Issue", type: "textarea" },
      { key: "grounds", label: "Grounds", type: "textarea" },
    ],
  },
];

export type LandmarkCase = {
  id: string;
  name: string;
  citation: string;
  year: number;
  bench: string;
  court: string;
  area: string;
  ratio: string;
  principles: string[];
  significance: string;
  flashcardHint?: string;
};

export const LANDMARK_CASES: LandmarkCase[] = [
  {
    id: "kesavananda",
    name: "Kesavananda Bharati v. State of Kerala",
    citation: "(1973) 4 SCC 225",
    year: 1973,
    bench: "13-Judge Constitution Bench",
    court: "Supreme Court of India",
    area: "Constitutional Law",
    ratio: "Parliament may amend any provision of the Constitution under Article 368, but it cannot alter or destroy the 'basic structure' of the Constitution.",
    principles: [
      "Basic Structure Doctrine enunciated",
      "List of basic features: supremacy of Constitution, separation of powers, federalism, secularism, judicial review, etc.",
      "Article 368 subject to implied limitations",
    ],
    significance: "Saving of Indian constitutional supremacy; bedrock of subsequent judicial review of amendments.",
    flashcardHint: "13-judge bench, 1973 – Basic Structure Doctrine",
  },
  {
    id: "maneka",
    name: "Maneka Gandhi v. Union of India",
    citation: "(1978) 1 SCC 248",
    year: 1978,
    bench: "7-Judge Bench",
    court: "Supreme Court of India",
    area: "Constitutional Law – Article 21",
    ratio: "Article 21 requires a 'procedure established by law' which must be fair, just and reasonable; Articles 14, 19 and 21 are mutually interconnected (golden triangle).",
    principles: [
      "Due process element read into Article 21",
      "Right to travel abroad part of personal liberty",
      "Audi alteram partem implied in Art. 21",
    ],
    significance: "Expanded Article 21 into a dynamic repository of substantive and procedural rights.",
    flashcardHint: "Passport impounding – Article 21 'procedure must be fair'",
  },
  {
    id: "vishaka",
    name: "Vishaka v. State of Rajasthan",
    citation: "(1997) 6 SCC 241",
    year: 1997,
    bench: "3-Judge Bench",
    court: "Supreme Court of India",
    area: "Gender Justice / Labour Law",
    ratio: "In absence of legislation, SC laid down binding guidelines to prevent sexual harassment of women at workplaces, drawing from CEDAW.",
    principles: [
      "Judicial legislation via Article 32/141",
      "Mandated Internal Complaints Committees",
      "Definition of sexual harassment laid down",
    ],
    significance: "Led to the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013.",
    flashcardHint: "Workplace harassment guidelines – precursor to POSH Act",
  },
  {
    id: "joseph-shine",
    name: "Joseph Shine v. Union of India",
    citation: "(2018) 2 SCC 189",
    year: 2018,
    bench: "5-Judge Constitution Bench",
    court: "Supreme Court of India",
    area: "Criminal Law / Gender Justice",
    ratio: "Struck down Section 497 IPC (adultery) as unconstitutional for violating Articles 14, 15 and 21 – it treated women as chattel.",
    principles: [
      "Adultery decriminalised",
      "Right to autonomy, dignity, sexual privacy",
      "Archaic gender-provisions struck down",
    ],
    significance: "Privacy / autonomy case following K.S. Puttaswamy.",
    flashcardHint: "Struck down adultery (Sec 497 IPC)",
  },
  {
    id: "puttaswamy",
    name: "K.S. Puttaswamy v. Union of India",
    citation: "(2017) 10 SCC 1",
    year: 2017,
    bench: "9-Judge Constitution Bench",
    court: "Supreme Court of India",
    area: "Constitutional Law – Privacy",
    ratio: "Right to Privacy is a fundamental right guaranteed under Part III of the Constitution, emanating from Articles 14, 19 and 21.",
    principles: [
      "Privacy includes bodily, informational, decisional privacy",
      "Overruled M.P. Sharma & Kharak Singh insofar as they doubted the right",
      "Foundation for subsequent decisions on Aadhaar, adultery, LGBTQ+ rights",
    ],
    significance: "Springboard for digital-rights and decisional-autonomy jurisprudence.",
    flashcardHint: "9-judge bench (2017) – Right to Privacy is FR",
  },
  {
    id: "m-c-mehta",
    name: "M.C. Mehta v. Union of India (Oleum Gas Leak)",
    citation: "(1987) 1 SCC 395",
    year: 1986,
    bench: "3-Judge Bench (Bhagwati J.)",
    court: "Supreme Court of India",
    area: "Environmental Law / Tort",
    ratio: "Evolved the principle of 'absolute liability' for hazardous industries – enterprise is strictly and absolutely liable for any harm caused, without exceptions.",
    principles: [
      "Absolute liability (stricter than Rylands v. Fletcher)",
      "Deep-pocket theory for compensation",
      "Locus relaxed – epistolary jurisdiction / PIL",
    ],
    significance: "Foundation of Indian environmental PIL and tort liability.",
    flashcardHint: "Oleum gas leak – Absolute Liability / Deep Pocket",
  },
  {
    id: "sr-bommai",
    name: "S.R. Bommai v. Union of India",
    citation: "(1994) 3 SCC 1",
    year: 1994,
    bench: "9-Judge Constitution Bench",
    court: "Supreme Court of India",
    area: "Constitutional Law – Federalism / Art. 356",
    ratio: "Presidential proclamation under Art. 356 is subject to judicial review; secularism is a basic feature; dismissal of state govt. requires floor test.",
    principles: [
      "Floor test mandatory before imposing President's Rule",
      "State assemblies cannot be dissolved before proclamation approved",
      "Secularism held to be basic feature",
    ],
    significance: "Landmark on Centre-State relations and abuse of Art. 356.",
    flashcardHint: "Article 356 – judicial review, floor test, secularism",
  },
  {
    id: "indra-sawhney",
    name: "Indra Sawhney v. Union of India (Mandal Commission)",
    citation: "1992 Supp (3) SCC 217",
    year: 1992,
    bench: "9-Judge Constitution Bench",
    court: "Supreme Court of India",
    area: "Reservation Law",
    ratio: "Upheld 27% reservation for OBCs in government jobs but held that total reservation cannot exceed 50%; creamy layer to be excluded; no reservation in promotions.",
    principles: [
      "50% ceiling on reservation",
      "Creamy layer exclusion",
      "No reservation in promotions (later modified)",
    ],
    significance: "Leading case on backward-class reservation.",
    flashcardHint: "Mandal case – 27% OBC, 50% cap, creamy layer",
  },
  {
    id: "navtej",
    name: "Navtej Singh Johar v. Union of India",
    citation: "(2018) 10 SCC 1",
    year: 2018,
    bench: "5-Judge Constitution Bench",
    court: "Supreme Court of India",
    area: "Criminal Law / LGBTQ+ Rights",
    ratio: "Struck down Section 377 IPC insofar as it criminalised consensual same-sex relations between adults, as violating Articles 14, 15, 19 and 21.",
    principles: [
      "Right to intimacy, identity, autonomy under Art 21",
      "Constitutional morality over popular morality",
      "Decriminalisation of homosexuality",
    ],
    significance: "Historic LGBTQ+ rights decision in India.",
    flashcardHint: "Sec 377 read down – consensual same-sex relations decriminalised",
  },
  {
    id: "kharak-singh",
    name: "Kharak Singh v. State of UP",
    citation: "[1964] 1 SCR 332",
    year: 1963,
    bench: "6-Judge Bench",
    court: "Supreme Court of India",
    area: "Privacy / Article 21",
    ratio: "While upholding police surveillance regulations, the Court recognised that 'personal liberty' includes rights ancillary to Article 21 – later the seed for the Puttaswamy privacy ruling.",
    principles: [
      "Article 21 extends beyond physical restraint",
      "Right to be let alone foreshadowed",
    ],
    significance: "Early Article 21 expansion; partially overruled by Puttaswamy.",
    flashcardHint: "Early privacy precursor – 'right to be let alone'",
  },
  {
    id: "dk-basu",
    name: "D.K. Basu v. State of West Bengal",
    citation: "(1997) 1 SCC 416",
    year: 1997,
    bench: "2-Judge Bench",
    court: "Supreme Court of India",
    area: "Criminal Procedure / Custodial Rights",
    ratio: "Laid down 11 mandatory guidelines to be followed in all cases of arrest/detention to prevent custodial violence (e.g., memo of arrest, access to lawyer, medical exam).",
    principles: [
      "Arrestee's rights under Article 21/22",
      "Binding guidelines later incorporated in Sec 41B CrPC",
    ],
    significance: "Key decision on police accountability and custodial deaths.",
    flashcardHint: "11 custodial arrest guidelines",
  },
  {
    id: "hussainara",
    name: "Hussainara Khatoon v. State of Bihar",
    citation: "(1979) 3 SCC 128",
    year: 1979,
    bench: "Bhagwati J., etc.",
    court: "Supreme Court of India",
    area: "Criminal Law – Speedy Trial",
    ratio: "Free legal aid and speedy trial are fundamental rights under Article 21; thousands of undertrials released on personal bonds.",
    principles: [
      "Speedy trial = Art 21 right",
      "Free legal aid to accused",
      "Bail not jail principle",
    ],
    significance: "Pioneering PIL for undertrial prisoners.",
    flashcardHint: "Speedy trial / free legal aid / undertrials released",
  },
];

// Mock "AI" generators
export function generateNi138Notice(inputs: Record<string, string>): string {
  const amount = Number(inputs.amount || 0).toLocaleString("en-IN");
  return `LEGAL NOTICE
(Under Section 138 of the Negotiable Instruments Act, 1881)

By Registered Post Acknowledgement Due / Speed Post / Courier

To,
${inputs.recipientName || "[Name of Drawer]"},
${inputs.recipientAddress || "[Address of Drawer]"}

              NOTICE

Under instructions from and on behalf of my client ${inputs.senderName || "[Payee]"}, residing/carrying on business at ___________________________________, I do hereby serve upon you the following NOTICE:

1. That my client is a Proprietorship / Partnership / Company engaged in the business of _____________________ and you, the Noticee, had been dealing with my client in course of the said business.

2. That in discharge of your legal liability for ${inputs.causeOfAction || "the lawful debt / advance / consideration due and payable by you to my client"}, you issued a Cheque bearing No. ${inputs.chequeNo || "[XXXX]"} dated ${inputs.chequeDate || "[DD/MM/YYYY]"} for a sum of ₹${amount} (Rupees ${inrWords(inputs.amount || "0")} only), drawn on ${inputs.bankName || "[Bank]"}, in favour of my client.

3. That the aforesaid cheque, when presented by my client for encashment on / around ${inputs.returnDate || "[date]"}, was returned unpaid by the banker of my client with the endorsement/memo dated ______________________ citing reason "______________________________" (Funds Insufficient / Account Closed / Stop Payment, etc.). A copy of the return memo is retained for records.

4. That the said cheque had been issued by you in discharge of a legally enforceable debt/liability within the meaning of Section 138 of the Negotiable Instruments Act, 1881. The dishonour of the said cheque has rendered you liable to prosecution under Section 138 of the said Act, which is punishable with imprisonment for a term which may extend to two years or with fine which may extend to twice the amount of the cheque, or with both.

5. That on failure to pay the amount of the said cheque within FIFTEEN DAYS from the date of receipt of this notice, my client shall be compelled to institute appropriate criminal proceedings under Section 138 read with Section 142 of the Negotiable Instruments Act, 1888 against you and in that event, you shall also be liable for all costs, interest, and consequential damages incurred by my client in that behalf.

6. This notice is issued without prejudice to all other rights and remedies available to my client under law.

You are, therefore, called upon through this notice to pay the sum of ₹${amount} (Rupees ${inrWords(inputs.amount || "0")} only) along with interest @ 12% p.a. and cost of this notice within FIFTEEN DAYS of the receipt hereof, failing which my client shall initiate criminal action against you in accordance with law.

Dated this _____ day of ______________, 20____

                                                 Signature of Advocate
                                                 ${inputs.senderAdvocate || "[Advocate Name]"}
                                                 Enrolment No.: _____________
                                                 Address: ____________________
                                                 Contact: ____________________

Copy retained in office for future reference.
`;
}

export function generateBail(inputs: Record<string, string>): string {
  return `BEFORE THE HON'BLE ${(inputs.courtName || "[Court]").toUpperCase()}

Misc. Regular Bail Application / Criminal Bail No. ____ of 20___

FIR No. ${inputs.firNo || "[XXXX/YYYY]"}
Police Station: ${inputs.policeStation || "[PS]"}
Under Sections: ${inputs.sections || "[Sections IPC]"}

In the matter of:

${inputs.accusedName || "[Accused Name]"},
S/o ${inputs.fatherName || "[Father's Name]"},
R/o ___________________________________
                                               ... Applicant / Accused

                              VERSUS

State (by ${inputs.policeStation || "[PS]"} Police)
                                               ... Respondent / State

                        APPLICATION FOR GRANT OF BAIL
                          (Under Section 437 / 439 Cr.P.C.)

MOST RESPECTFULLY SHEWETH:

1. That the applicant is an innocent citizen of India gainfully engaged in _______________ and has no criminal antecedents whatsoever.

2. That the applicant has been falsely implicated in the captioned FIR registered at Police Station ${inputs.policeStation || "[...]"} under Sections ${inputs.sections || "[...]"}. The allegations against the applicant are false, motivated and without any credible evidence.

3. That the applicant surrendered / was produced before the Ld. Magistrate on ___________________ and has been in judicial / police custody since ___________________.

4. That the grounds for grant of bail, inter alia, are:

${bulletGrounds(inputs.grounds) || `     (a) That the applicant is not required for any further custodial interrogation and all the recoveries / documents in the possession of the investigating agency have already been seized / verified.
     (b) That the applicant is not a flight risk and undertakes to appear before this Hon'ble Court on each and every date of hearing, as may be fixed by the Court.
     (c) That the applicant has deep roots in society and is the sole bread-earner of his family comprising ____________ dependent members.
     (d) That the applicant is ready and willing to furnish solvent sureties / personal bond to the satisfaction of this Hon'ble Court.
     (e) That the offences alleged are triable by ________________________ and the evidence is essentially documentary; the applicant shall not tamper with the evidence or influence any prosecution witness.
     (f) That the applicant is suffering from ________________ (medical ailment, if any) and requires regular medical attention.`}

5. That the applicant undertakes:
     (i) to abide by all conditions that this Hon'ble Court may impose;
    (ii) not to leave the territorial jurisdiction of this Court without prior permission;
   (iii) not to make any inducement, threat or promise to any person acquainted with the facts of the case so as to dissuade him from disclosing such facts to the Court or to any police officer;
    (iv) to appear before the Court on every date of hearing.

6. That the applicant is in custody since ____________ and the charge-sheet is yet to be filed / has been filed. The applicant is entitled to bail on the well-settled principles laid down in several decisions of the Hon'ble Supreme Court, including State of Rajasthan v. Balchand, (1977) 4 SCC 308 and Joginder Kumar v. State of U.P., (1994) 4 SCC 260.

PRAYER

In view of the above, it is most respectfully prayed that this Hon'ble Court may be pleased to:

     (a) release the applicant on bail in connection with FIR No. ${inputs.firNo || "[XXXX]"}, P.S. ${inputs.policeStation || "[PS]"};
     (b) pass such other and further orders as this Hon'ble Court may deem fit and proper in the facts and circumstances of the case, in the interest of justice.

And for this act of kindness the Applicant shall as duty bound ever pray.

                                                         Signature of Applicant

                                                         Signature of Counsel
                                                         Advocate for the Applicant
                                                         Enrolment No.: _____________

Date: ______________
Place: ______________
`;
}

export function generateWritHabeas(inputs: Record<string, string>): string {
  return `IN THE HIGH COURT OF ${(inputs.court || "[Court]").toUpperCase()}
(Original Criminal / Writ Jurisdiction)

WRIT PETITION (CRIMINAL) NO. ____ OF 20___

${inputs.petitioner || "[Petitioner]"}                                              ... Petitioner(s)

                                 VERSUS

${inputs.respondent || "[State & Ors.]"}                                          ... Respondent(s)

                        WRIT PETITION UNDER ARTICLE 226 / 227 OF THE CONSTITUTION OF INDIA
                        (FOR ISSUANCE OF WRIT OF HABEAS CORPUS)

                              INDEX
1. Writ Petition with Annexures
2. Affidavit in support
3. Application for urgent hearing
4. Stay / interim custody application

TO,
THE HON'BLE THE CHIEF JUSTICE AND HIS COMPANION JUDGES OF THE SAID HIGH COURT.

THE HUMBLE PETITION OF THE PETITIONER ABOVENAMED:

1. That the detenu, namely, ${inputs.detenu || "[Detenu]"} aged about ___ years, S/o / D/o ________________________, R/o ___________________________________ has been illegally and unlawfully detained by the respondents / their agents since ____________________ (date) without there being any authority of law and without production before a Magistrate within the period stipulated under Section 57 of the Code of Criminal Procedure, 1973.

2. The material facts are:
${paragraphise(inputs.facts, "     ")}

3. GROUNDS:
${paragraphise(inputs.grounds, "     ")}
   (a) That the detention is in gross violation of Articles 21 and 22 of the Constitution of India.
   (b) That the detenu has been kept incommunicado; family members and counsel have been denied access.
   (c) That no grounds of detention have been supplied within the statutory period.
   (d) That the Respondents have refused to acknowledge the lawful custodial status of the detenue despite repeated representations.

4. That the Petitioner has no other equally efficacious remedy except to invoke the extraordinary writ jurisdiction of this Hon'ble Court under Articles 226 and 227 of the Constitution for issuance of a Writ of Habeas Corpus.

5. That this writ petition is supported by an affidavit of the petitioner annexing relevant documents.

PRAYER

It is, therefore, most respectfully prayed that this Hon'ble Court may be pleased to:

     (a) ISSUE a writ of Habeas Corpus directing the respondents to produce the detenu ${inputs.detenu || "[...]"} before this Hon'ble Court;
     (b) ORDER setting at liberty the said detenu forthwith;
     (c) DIRECT an enquiry into the illegal detention and award appropriate compensation;
     (d) PASS any other order(s) as this Hon'ble Court may deem fit.

And for this act of kindness the Petitioner shall as in duty bound ever pray.

Drawn by:
Advocate for the Petitioner                Signature of the Petitioner

Date: _____________
Place: _____________
`;
}

export function generateConsumerComplaint(inputs: Record<string, string>): string {
  return `BEFORE THE DISTRICT CONSUMER DISPUTES REDRESSAL COMMISSION, ______________

Consumer Complaint No. ___________ / 20___

${inputs.complainant || "[Complainant]"},
                                       ... Complainant(s)

                                VERSUS

${inputs.oppositeParty || "[Opposite Party]"},
                                       ... Opposite Party / Parties

                     COMPLAINT UNDER SECTION 35 OF THE CONSUMER PROTECTION ACT, 2019

MOST RESPECTFULLY SUBMITTED:

1. PARTICULARS OF COMPLAINANT:
   Name & Address: ${inputs.complainant || "[...]"}
   Contact No.: _____________________

2. PARTICULARS OF OPPOSITE PARTY / PARTIES:
   Name & Address: ${inputs.oppositeParty || "[...]"}

3. DESCRIPTION OF GOODS / SERVICES:
   ${inputs.product || "[Description of product / service]"}
   Amount paid: ₹${Number(inputs.amountPaid || 0).toLocaleString("en-IN")}/- (Rupees ${inrWords(inputs.amountPaid || "0")} only)
   Date of purchase / availing service: _________________

4. DETAILS OF THE DEFECT / DEFICIENCY IN GOODS / SERVICES:
${paragraphise(inputs.defect, "   ")}

5. That the Complainant has approached the Opposite Party on prior occasions by letters / emails dated _______________ which have not been redressed to satisfaction, despite the Opposite Party being duty bound under the sale / service contract and under the Consumer Protection Act, 2019.

6. That the cause of action arose on _______________ and is continuing by reason of the persistent deficiency and failure to redress the grievance.

7. That the Commission has territorial and pecuniary jurisdiction to entertain and adjudicate this complaint.

8. RELIEF CLAIMED:
${paragraphise(inputs.relief, "   ")}
   (a) Refund of ₹${Number(inputs.amountPaid || 0).toLocaleString("en-IN")}/- with interest @ 12% p.a. from the date of complaint;
   (b) Rs. ______________/- towards compensation for mental agony and harassment;
   (c) Rs. ______________/- towards costs of litigation;
   (d) Any other relief as this Commission may deem fit.

9. That the Complainant has not filed any other complaint or proceeding before any other forum / commission / court on the same subject matter.

10. That the requisite court-fee has been affixed.

VERIFICATION

Verified at ___________ on this ____ day of _____________ 20___ that the contents of the complaint are true and correct to my knowledge and belief. An affidavit in support is annexed hereto.

                                                                 Complainant

                                                                 Advocate for the Complainant
                                                                 Enrolment No.: _______________
`;
}

export function generateWrittenStatement(inputs: Record<string, string>): string {
  return `BEFORE THE HON'BLE CIVIL JUDGE / SENIOR CIVIL JUDGE / DISTRICT JUDGE, _______________

Title: ${inputs.plaintiff || "[Plaintiff]"}
                                        ... Plaintiff

                              VERSUS

       ${inputs.defendant || "[Defendant]"}
                                        ... Defendant

Suit No. ${inputs.suitNo || "[XXXX/YYYY]"}

                     WRITTEN STATEMENT ON BEHALF OF THE DEFENDANT
                     (FILED PURSUANT TO ORDER VIII RULE 1 CPC)

PRELIMINARY OBJECTIONS

1. That the suit, as filed, is without cause of action, is barred by limitation and is liable to be dismissed in limine.
2. That the plaintiff has suppressed material facts and approached this Hon'ble Court with unclean hands.
3. That the requisite court fee under the Court Fees Act, 1870 has not been paid and the suit is not properly valued for the purposes of jurisdiction.
4. That the suit is bad for non-joinder and mis-joinder of necessary / proper parties.
5. That the plaint discloses no cause of action and is liable to be rejected under Order VII Rule 11 CPC.

REPLY ON MERITS (PARAGRAPH-WISE)

[The defendant denies each and every allegation contained in the plaint, unless specifically admitted, and responds to the allegations in the plaint as follows.]

1. In response to Paragraph ___ of the plaint:
   ${paragraphise(inputs.plaintAllegations || "[Para-wise response / denials]", "   ")}

2. That the defendant specifically denies that:
${paragraphise(inputs.defence || "[Specific denials]", "   ")}

ADDITIONAL PLEAS OF THE DEFENDANT

1. That the alleged contract / agreement / transaction on which the plaintiff places reliance is without consideration, without free consent and is liable to be declared void under Sections 25 and 26 of the Indian Contract Act, 1872.

2. That the plaintiff himself is guilty of breach of the terms of the alleged agreement and has, on account of his own conduct, disentitled himself from claiming any relief from this Hon'ble Court.

3. That the plaintiff has already received the amounts claimed and/or adjusted the same against outstanding dues.

4. That the suit is otherwise false, frivolous and vexatious and is an abuse of the process of law.

PRAYER

In view of the above, it is most respectfully prayed that this Hon'ble Court may be pleased to:

     (a) dismiss the suit with exemplary costs;
     (b) reject the plaint under Order VII Rule 11 CPC;
     (c) grant such other and further relief(s) as this Hon'ble Court may deem just and proper in the facts and circumstances of the case.

VERIFICATION

Verified at _______________ on this ____ day of ______________ 20__ that the contents of the Written Statement are true and correct to the best of my knowledge and belief and nothing material has been concealed therefrom.

Defendant

Through Counsel
Advocate for Defendant
Enrolment No.: _____________
`;
}

export function generateSLP(inputs: Record<string, string>): string {
  return `IN THE SUPREME COURT OF INDIA
(EXTRAORDINARY CIVIL / CRIMINAL JURISDICTION)

SPECIAL LEAVE PETITION (CIVIL / CRIMINAL) NO. _________ / 20___

${inputs.petitioner || "[Petitioner]"}
                                              ... Petitioner(s)

                              VERSUS

${inputs.respondent || "[Respondent]"}
                                              ... Respondent(s)

                       PETITION FOR SPECIAL LEAVE TO APPEAL UNDER ARTICLE 136
                       OF THE CONSTITUTION OF INDIA

WITH

APPLICATION FOR EXEMPTION FROM FILING CERTIFIED COPY / OFFICIAL TRANSLATION
APPLICATION FOR STAY / INTERIM RELIEF
APPLICATION FOR CONDONATION OF DELAY (if any)

TO,
THE HON'BLE THE CHIEF JUSTICE OF INDIA AND HIS COMPANION JUDGES OF THE SUPREME COURT OF INDIA.

THE HUMBLE PETITION OF THE PETITIONER ABOVENAMED MOST RESPECTFULLY SHEWETH:

1. The Petitioner(s) aggrieved by the final judgment and order dated ______________ passed by the ${inputs.lowerCourt || "[High Court / Tribunal]"} in ${inputs.lowerCourt || "[...]"} whereby the Hon'ble Court / Tribunal has ___________________________ [e.g. dismissed the writ petition / reversed acquittal], most respectfully seek(s) special leave to appeal under Article 136 of the Constitution.

2. QUESTION(S) OF LAW OF PUBLIC / GENERAL IMPORTANCE:
${paragraphise(inputs.questionOfLaw, "   ")}

3. That the impugned judgment is erroneous and suffers from errors of jurisdiction, errors of law apparent on the face of the record, and results in grave miscarriage of justice, for the following grounds:

${paragraphise(inputs.grounds, "   ")}

4. That the Petitioner has not filed any other petition or appeal against the impugned order in any other court or forum.

5. That the Petitioner is in possession of a certified copy of the impugned order and shall file the same within the period prescribed.

6. That the Petitioner is ready and willing to furnish such security for costs as this Hon'ble Court may deem appropriate.

GROUNDS FOR INTERIM RELIEF (if applicable)

In the event no ex parte interim order is made, the impugned order will be given effect to and the petitioner shall suffer irreparable loss and injury for which he cannot be adequately compensated in money.

PRAYER

In the premises aforesaid, it is most respectfully prayed that this Hon'ble Court may be pleased to:

     (a) GRANT leave to appeal against the final order / judgment dated ___________ passed by the ${inputs.lowerCourt || "[Court / Tribunal]"};
     (b) ISSUE notice upon the Respondents;
     (c) STAY the operation and further proceedings pursuant to the impugned order;
     (d) After hearing all concerned, allow the appeal and set aside / modify the impugned order;
     (e) Award costs and pass any other orders as this Hon'ble Court may deem fit and proper.

And for this act of kindness the Petitioner shall as in duty bound ever pray.

FILED BY:
Counsel for Petitioner(s)

Drawn on: ______________
Filed on:  ______________
`;
}

// Helper to convert numbers to words (simple Indian style – only up to reasonable digits).
function inrWords(num: string): string {
  const n = Number(num);
  if (!n || Number.isNaN(n)) return "[amount]";
  return n.toLocaleString("en-IN");
}

function bulletGrounds(text?: string): string {
  if (!text) return "";
  return text
    .split(/\n|(?=\d+\.)/)
    .map((t, i) => `     (${String.fromCharCode(97 + i)}) ${t.trim()}`)
    .filter(Boolean)
    .join("\n");
}

function paragraphise(text: string | undefined, indent = "   ") {
  if (!text) return `${indent}The said paragraphs are stated / averred as narrated.`;
  return text
    .split(/\n+/)
    .map((l) => `${indent}${l.trim()}`)
    .join("\n");
}

// Simple "precedent suggester" – returns relevant citations based on keywords.
export function suggestPrecedents(text: string): LandmarkCase[] {
  const lower = text.toLowerCase();
  const rules: { keywords: string[]; case: LandmarkCase }[] = [
    { keywords: ["bail", "439", "437", "custody"], case: LANDMARK_CASES.find((c) => c.id === "dk-basu")! },
    { keywords: ["138", "cheque", "negotiable", "ni act"], case: LANDMARK_CASES.find((c) => c.id === "m-c-mehta")! }, // placeholder
    { keywords: ["privacy", "aadar", "aadhaar", "article 21"], case: LANDMARK_CASES.find((c) => c.id === "puttaswamy")! },
    { keywords: ["article 21", "life", "liberty", "passport"], case: LANDMARK_CASES.find((c) => c.id === "maneka")! },
    { keywords: ["adultery", "497"], case: LANDMARK_CASES.find((c) => c.id === "joseph-shine")! },
    { keywords: ["377", "homosexuality", "lgbt", "queer"], case: LANDMARK_CASES.find((c) => c.id === "navtej")! },
    { keywords: ["basic structure", "amendment", "368"], case: LANDMARK_CASES.find((c) => c.id === "kesavananda")! },
    { keywords: ["356", "president rule", "bommai", "federal"], case: LANDMARK_CASES.find((c) => c.id === "sr-bommai")! },
    { keywords: ["reservation", "obc", "creamy layer", "mandal"], case: LANDMARK_CASES.find((c) => c.id === "indra-sawhney")! },
    { keywords: ["habeas", "detention", "custodial"], case: LANDMARK_CASES.find((c) => c.id === "hussainara")! },
    { keywords: ["environment", "pollution", "hazardous", "oleum", "liability"], case: LANDMARK_CASES.find((c) => c.id === "m-c-mehta")! },
    { keywords: ["sexual harassment", "vishaka", "posh", "workplace"], case: LANDMARK_CASES.find((c) => c.id === "vishaka")! },
    { keywords: ["speedy trial", "undertrial", "legal aid"], case: LANDMARK_CASES.find((c) => c.id === "hussainara")! },
    { keywords: ["consumer", "deficiency", "product"], case: LANDMARK_CASES.find((c) => c.id === "laxmi-engineering") || LANDMARK_CASES.find((c) => c.id === "m-c-mehta")! },
  ];
  const matched: LandmarkCase[] = [];
  const seen = new Set<string>();
  for (const r of rules) {
    if (r.keywords.some((k) => lower.includes(k))) {
      if (!seen.has(r.case.id)) {
        matched.push(r.case);
        seen.add(r.case.id);
      }
    }
  }
  if (matched.length === 0) {
    // Return two commonly cited defaults relevant to general Indian drafting
    return [LANDMARK_CASES.find((c) => c.id === "maneka")!, LANDMARK_CASES.find((c) => c.id === "puttaswamy")!];
  }
  return matched.slice(0, 5);
}

// Tone & Compliance check – very simplified heuristic
export type ComplianceIssue = { type: "error" | "warning" | "info"; message: string; snippet?: string };

export function checkToneAndCompliance(text: string): { score: number; issues: ComplianceIssue[] } {
  const issues: ComplianceIssue[] = [];
  if (!text) return { score: 0, issues: [{ type: "error", message: "Draft is empty." }] };

  const lower = text.toLowerCase();

  // Heuristics
  if (/\b(i|i'm|we feel|i think)\b/i.test(text) && text.length < 500) {
    issues.push({ type: "warning", message: "Avoid first-person singular ('I think' / 'I feel') in formal pleadings; use 'the deponent/Applicant submits/averred'." });
  }
  if (/\b(!+)\b/.test(text)) issues.push({ type: "warning", message: "Avoid exclamation marks in formal legal drafting." });
  if (/\bsubmited\b|\brecieved\b|\bseperate\b/i.test(text)) issues.push({ type: "error", message: "Possible spelling error(s) detected – e.g., 'submited' → 'submitted'." });
  if (!/hon'ble|honorable/i.test(text) && (text.includes("Court") || text.includes("court"))) {
    issues.push({ type: "info", message: "Consider referring to the court as 'this Hon'ble Court' for formal tone." });
  }
  if (!/prayer|prayed/i.test(text)) issues.push({ type: "warning", message: "No explicit 'PRAYER' clause detected. Pleadings typically end with a prayer." });
  if (!/verification/i.test(text)) issues.push({ type: "info", message: "A 'Verification' paragraph is recommended in pleadings (Order VI Rule 15 CPC)." });
  if (text.length < 300) issues.push({ type: "warning", message: "Draft appears short – ensure material facts and grounds are fully pleaded." });
  if (/\b(court|judge)\b/i.test(text) && !/annexed/i.test(text)) issues.push({ type: "info", message: "Consider listing annexures / supporting documents at the end." });
  if (/(lmao|lol|wtf)/i.test(lower)) issues.push({ type: "error", message: "Informal/slang language detected – must be removed." });

  let score = 100 - issues.reduce((acc, i) => acc + (i.type === "error" ? 20 : i.type === "warning" ? 8 : 3), 0);
  if (score < 0) score = 0;
  return { score, issues };
}

// Citation generator
export type CitationFormat = "bluebook" | "oscola";
export type CitationInputType = "case" | "book" | "article" | "act" | "thesis";

export function generateCitation(
  format: CitationFormat,
  type: CitationInputType,
  data: Record<string, string>
): string {
  if (format === "bluebook") {
    switch (type) {
      case "case": {
        // Case Name, Volume Reporter Page (Court Year).
        return `${data.caseName || "Case Name"}, ${data.volume || "[vol]"} ${data.reporter || "[Reporter]"} ${data.page || "[p]"} (${data.court || "SC/HC"} ${data.year || "YYYY"}).`;
      }
      case "book": {
        // Author, Title (Edition, Publisher Year) Page.
        return `${data.author || "Author"}, ${data.title || "Title"} (${data.edition || "edn"}, ${data.publisher || "Publisher"} ${data.year || "YYYY"}) ${data.page ? "at " + data.page : ""}.`;
      }
      case "article": {
        return `${data.author || "Author"}, '${data.title || "Title"}' (${data.year || "YYYY"}) ${data.volume || "vol"} ${data.journal || "Journal"} ${data.page || "p"}.`;
      }
      case "act": {
        return `${data.title || "Act Name"}, ${data.year || "YYYY"} (India), No. ${data.number || "X"} of ${data.year || "YYYY"}.`;
      }
      case "thesis": {
        return `${data.author || "Author"}, '${data.title || "Title"}' (${data.thesisType || "PhD"} thesis, ${data.university || "University"}, ${data.year || "YYYY"}).`;
      }
    }
  } else {
    // OSCOLA
    switch (type) {
      case "case": {
        // Case Name [Year] Volume Reporter Page (Court)
        return `${data.caseName || "Case Name"} [${data.year || "YYYY"}] ${data.volume || "vol"} ${data.reporter || "Reporter"} ${data.page || "p"} (${data.court || "SC"}).`;
      }
      case "book": {
        // Author, Title (edn, Publisher Year).
        return `${data.author || "Author"}, ${data.title || "Title"} (${data.edition || "n"} edn, ${data.publisher || "Publisher"} ${data.year || "YYYY"}).`;
      }
      case "article": {
        // Author, 'Title' (Year) Volume Journal page.
        return `${data.author || "Author"}, '${data.title || "Title"}' (${data.year || "YYYY"}) ${data.volume || "vol"} ${data.journal || "Journal"} ${data.page || "p"}.`;
      }
      case "act": {
        return `${data.title || "Act Name"} ${data.year || "YYYY"} (India).`;
      }
      case "thesis": {
        return `${data.author || "Author"}, '${data.title || "Title"}' (${data.thesisType || "PhD"} thesis, ${data.university || "University"} ${data.year || "YYYY"}).`;
      }
    }
  }
}

// Multi-case "ratio extraction" – heuristic / template based.
export type ExtractedCase = {
  name: string;
  year: string;
  court: string;
  ratio: string;
  principles: string[];
  keywords: string[];
};

export function extractRatioFromPDFName(fileName: string): ExtractedCase {
  // Try to match by name against known landmark cases.
  const name = fileName.replace(/\.pdf$/i, "").replace(/[_-]+/g, " ");
  const lower = name.toLowerCase();
  const match = LANDMARK_CASES.find((c) => lower.includes(c.name.split(" v.")[0].toLowerCase().split(" ")[0]));
  if (match) {
    return {
      name: match.name,
      year: String(match.year),
      court: match.court,
      ratio: match.ratio,
      principles: match.principles,
      keywords: match.area.split("/").map((s) => s.trim()),
    };
  }
  // Fallback: fabricate a plausible ratio from the filename.
  return {
    name: name.replace(/\b\w/g, (c) => c.toUpperCase()),
    year: (fileName.match(/(19|20)\d{2}/)?.[0]) || "—",
    court: /(sc|supreme)/i.test(fileName) ? "Supreme Court of India" : /(hc|high)/i.test(fileName) ? "High Court" : "Court / Tribunal",
    ratio: `The Court, on a perusal of the record and in light of the governing statutory and constitutional principles, held that the contentions raised are required to be tested against the operative ratio in the field. The decision crystallises the legal position that rights and liabilities must be construed strictly in accordance with the plain language of the statute, read in the light of binding precedent.`,
    principles: [
      "Statutory interpretation in favour of plain language",
      "Binding precedents to be followed in pari materia",
      "Burden of proof lies on the party asserting the fact",
    ],
    keywords: ["General"],
  };
}

export type ComparativeReport = {
  agreements: string[];
  contradictions: string[];
  trends: string[];
  summary: string;
};

export function buildComparativeReport(cases: ExtractedCase[]): ComparativeReport {
  if (cases.length === 0) {
    return { agreements: [], contradictions: [], trends: [], summary: "No cases analysed." };
  }
  const areas = new Set<string>();
  cases.forEach((c) => c.keywords.forEach((k) => areas.add(k)));

  const agreements = [
    "All surveyed decisions affirm that courts must act in accordance with the binding/ruling precedent of superior courts.",
    "A common thread across the batch is the emphasis on fairness, reasonableness and compliance with statutory procedure.",
    "Where fundamental rights or statutory protections are engaged, the courts uniformly require strict compliance and reasoned orders.",
  ];

  const contradictions: string[] = [];
  if (cases.some((c) => /Constitution/i.test(c.court)) && cases.length > 1) {
    contradictions.push(
      "Minor differences appear in the weight attached to procedural versus substantive compliance — older decisions lay greater emphasis on procedural rigor, while more recent decisions adopt a purposive, substantive approach."
    );
  }
  if (areas.size > 1) {
    contradictions.push(
      "Cases span multiple legal areas; direct ratio must not be applied across different statutory schemes without careful adaptation."
    );
  }

  const trends = [
    "Across the batch, there is a discernible judicial trend toward purposive and rights-centric interpretation, particularly where Article 21 / human dignity is engaged.",
    "More recent judgments appear willing to impose continuing mandamus / supervisory jurisdiction to ensure executive compliance.",
    "Earlier decisions tend to apply a textualist approach; later ones harmoniously read constitutional morality and human rights principles into statutes.",
  ];

  const summary = `Comparative analysis of ${cases.length} uploaded judgments reveals a dominant judicial orientation towards upholding rights and insisting on procedural regularity. Key convergences relate to the binding nature of precedent and the requirement of a reasoned order; divergences mainly concern the permissible scope of judicial creativity where statute is silent. The overall trend supports a progressive, rights-based approach in the relevant area(s) (${Array.from(areas).join(", ")}). Researchers may rely on the consensus points noted above while being careful to flag the distinguishable factual matrices.`;

  return { agreements, contradictions: contradictions.length ? contradictions : ["No material contradictions detected – all cases align on the core ratio."], trends, summary };
}

// Adaptive mock-test engine
export type MCQ = { q: string; options: string[]; answer: number; explanation: string };

export const QUESTION_BANK: MCQ[] = [
  {
    q: "Which case propounded the 'Basic Structure Doctrine' in India?",
    options: ["A.K. Gopalan v. State of Madras", "Kesavananda Bharati v. State of Kerala", "Maneka Gandhi v. UOI", "S.R. Bommai v. UOI"],
    answer: 1,
    explanation: "A 13-Judge bench in Kesavananda Bharati (1973) held that Parliament cannot amend the basic structure of the Constitution.",
  },
  {
    q: "Right to Privacy was declared a Fundamental Right in:",
    options: ["M.P. Sharma v. Satish Chandra", "Kharak Singh v. State of UP", "K.S. Puttaswamy v. UOI", "Govind v. State of MP"],
    answer: 2,
    explanation: "A 9-Judge Constitution Bench in K.S. Puttaswamy (2017) held the Right to Privacy is a FR under Articles 14/19/21.",
  },
  {
    q: "Under which section is a statutory notice for dishonour of cheque issued?",
    options: ["Section 138 NI Act", "Section 142 NI Act", "Section 420 IPC", "Section 80 CPC"],
    answer: 0,
    explanation: "Section 138 of the Negotiable Instruments Act requires a statutory notice within 30 days of dishonour.",
  },
  {
    q: "Which decision laid down guidelines against sexual harassment at workplaces?",
    options: ["Vishaka v. State of Rajasthan", "Laxmi v. UOI", "Githa Hariharan v. RBI", "Joseph Shine v. UOI"],
    answer: 0,
    explanation: "Vishaka (1997) laid down the Vishaka Guidelines, precursor to the POSH Act 2013.",
  },
  {
    q: "Sec 497 IPC (Adultery) was struck down in:",
    options: ["Navtej Singh Johar", "Joseph Shine v. UOI", "Suresh Kumar Koushal", "Common Cause v. UOI"],
    answer: 1,
    explanation: "Joseph Shine (2018) by a 5-Judge bench struck down adultery as unconstitutional.",
  },
  {
    q: "Absolute liability principle for hazardous industries was evolved in:",
    options: ["Rylands v. Fletcher", "M.C. Mehta (Oleum Gas Leak)", "Vellore Citizens Welfare Forum", "MC Mehta v. Kamal Nath"],
    answer: 1,
    explanation: "In the Oleum Gas Leak case, the Supreme Court evolved 'absolute liability' without exceptions.",
  },
  {
    q: "Article 356 presidential proclamation judgment:",
    options: ["S.R. Bommai v. UOI", "Minerva Mills v. UOI", "I.R. Coelho v. State of TN", "Waman Rao v. UOI"],
    answer: 0,
    explanation: "S.R. Bommai (1994) laid down guidelines for use of Art 356, including judicial review and floor test.",
  },
  {
    q: "Mandal Commission case is known as:",
    options: ["Indra Sawhney v. UOI", "Ashok Kumar Thakur v. UOI", "M. Nagaraj v. UOI", "Jarnail Singh v. Lacchmi Narain"],
    answer: 0,
    explanation: "Indra Sawhney (1992) is the Mandal case upholding 27% OBC reservation with creamy layer exclusion and 50% cap.",
  },
  {
    q: "Which case decriminalised Section 377 for consensual same-sex relations?",
    options: ["Suresh Kumar Koushal", "Naz Foundation (Delhi HC)", "Navtej Singh Johar v. UOI", "Aruna Shanbaug v. UOI"],
    answer: 2,
    explanation: "Navtej Singh Johar (2018) by a 5-Judge bench read down Section 377 IPC.",
  },
  {
    q: "D.K. Basu guidelines relate to:",
    options: ["Arrest / custodial rights", "Environmental pollution", "Speedy trial", "Right to information"],
    answer: 0,
    explanation: "D.K. Basu laid down 11 mandatory guidelines to be followed at the time of arrest.",
  },
  {
    q: "Hussainara Khatoon v. State of Bihar is famous for:",
    options: ["Free legal aid and speedy trial of undertrials", "Right to education", "PIL on bonded labour", "Prison reforms"],
    answer: 0,
    explanation: "Hussainara Khatoon (1979) established that free legal aid and speedy trial are rights under Article 21.",
  },
  {
    q: "Maneka Gandhi's case expanded Article 21 by reading in:",
    options: ["Due process and fairness", "Right to property", "Right to vote", "Right to religion"],
    answer: 0,
    explanation: "Maneka Gandhi (1978) read 'due process' fairness into Article 21 and wove the 'golden triangle' Arts 14-19-21.",
  },
];
