export type Lang = 'en' | 'it';

type Strings = {
  title: string; mission: string; lead: string;
  whatTitle: string; whatLead: string; terms: [string, string, string][]; whatNote: string; whatMore: string; whatMoreHref: string;
  howTitle: string; howLead: string; steps: [string, string][];
  firstBuilt: string; status: string; alphaText: string; enter: string; pulseSoon: string;
  facts: [string, string][];
  badgeKicker: string; badgeTitle: string; badgeLead: string; badgeFoot: string;
  task: string; learn: string; reward: string;
  badges: { name: string; who: string; task: string; learn: string; tone: 'teal' | 'clay' | 'ink' }[];
  newsTitle: string; newsLead: string;
  openTitle: string; openText: string; code: string;
  footer: string; contact: string; docTitle: string;
  live: { founded: string; reading: string; readAt: string; unreachable: string;
    members: string; council: string; councilVal: string; councilSub: string;
    treasury: string; treasurySub: string; treasuryUnread: string; paidOut: string; paidSub: string; paidSubOne: string; sats: string;
    voteOpen: string; closesIn: string; closed: string; voteNote: string; moreOpen: string; noVote: string; openVote: string;
    latestPayout: string; payoutFor: string; paidOn: string; onChain: string; noPayout: string;
    storyTitle: string; day: string; sFounded: string; sPassed: string; sRejected: string; sPaid: string; sPaidFor: string; sMoved: string; sJoined: string; sLeft: string };
};

export const T: Record<Lang, Strings> = {
  en: {
    title: 'Build Your Own Bitcoin DAO',
    mission: 'Cooperate. Collaborate. Coordinate. Without the paperwork.',
    whatTitle: 'What is a DAO?',
    whatLead: 'A group of people who share a purpose and a pot of money, and run both together through an app instead of a registered company.',
    terms: [
      ['D', 'Decentralised', 'No head office and no single person in charge of the money. Spending needs several keyholders to agree.'],
      ['A', 'Autonomous', 'The group runs by its own rules, which the members set and change by vote. No registry, bank or notary has to approve them.'],
      ['O', 'Organisation', 'People working towards something together, like a club, an association or a co-op. The money is held in bitcoin.'],
    ],
    whatNote: 'Not a company and not a legal entity: no notary, no bank account, no accountant, no token.',
    whatMore: 'What a DAO is, and how it compares with a co-op →',
    whatMoreHref: 'https://github.com/Bitcoin-DAO/btc-dao/blob/main/docs/handout.md',
    lead: 'Together, a community holds a bitcoin treasury. Members propose and vote from their phones; council members sign every payment with their own key, on an offline signing device; anyone can check every count and every coin.',
    howTitle: 'How a DAO is built',
    howLead: 'No company in the middle, no token, no account. Four steps, done by the people who will run it.',
    steps: [
      ['Cut the keys', 'Each council member makes a key at the workshop: dice, a SeedSigner, a card written by hand. No computer ever sees it.'],
      ['Found it', 'Five phones, one meeting. The founders sign up, the council approves, and the DAO exists.'],
      ['Run it', 'Members propose and vote. Payouts are paid in rounds, in tranches on delivery, signed by the council.'],
      ['Check it', 'Every phone recounts every vote and rechecks every payment against the blockchain. Nothing to trust.'],
    ],
    firstBuilt: 'DAO Dashboard',
    status: 'Founding at the workshop',
    alphaText: 'A private alpha on testnet4: five council members, keys cut by hand at a workshop, 3 of 5 to sign. Practice votes of ten minutes, real rules, a real record.',
    enter: 'Enter ALPHA DAO',
    pulseSoon: 'Once ALPHA DAO is founded, its live pulse shows here: members, treasury, the vote that is open, the latest payout.',
    facts: [['Council', '3 of 5'], ['Network', 'testnet4'], ['Members', '—'], ['Treasury', '—']],
    badgeKicker: 'Badge bounties',
    badgeTitle: 'Learning by doing',
    badgeLead: 'No manual to read first. Each badge is a small bounty: do the task for real, in the DAO, and the DAO pays you a few sats. The badge appears by itself: the DAO’s own record shows you did it. Four badges, and you have done what a member does.',
    badgeFoot: 'Nobody hands out badges: every phone reads them from the DAO’s record, so anyone can check them. They carry no votes and no rank: every member counts the same.',
    task: 'Do:', learn: 'You learn:', reward: '+ [n] sats',
    badges: [
      { name: 'Wallet', who: 'every member', task: 'Add your bitcoin address to your profile.', learn: 'Your own wallet, your own keys: the DAO pays you there, and no one else can move those coins.', tone: 'ink' },
      { name: 'Voice', who: 'every member', task: 'Cast a vote on an open proposal.', learn: 'One member, one vote, from your phone; the count is published and anyone can redo it.', tone: 'teal' },
      { name: 'Proposer', who: 'every member', task: 'Publish a proposal, even a small one.', learn: 'How an idea becomes a decision: the voting period, the quorum, the majority it needs.', tone: 'teal' },
      { name: 'Builder', who: 'every member', task: 'Claim a bounty, deliver it, report it.', learn: 'How the treasury pays for work: on delivery, in tranches, in public.', tone: 'clay' },
    ],
    newsTitle: 'News from the zone',
    newsLead: 'Short posts, newest first.',
    openTitle: 'Open Source',
    openText: 'The kit is open source: the app, the relay, the guide and the workshop cards. Any community can build its own DAO with it.',
    code: 'The kit: btc-dao',
    footer: 'Build Your Own Bitcoin DAO',
    contact: 'Contact:',
    docTitle: 'byob.zone · Build Your Own Bitcoin DAO',
    live: {
      founded: 'Founded {date}', reading: 'Reading the DAO’s record…', readAt: 'Read from the DAO’s own record at {time}, the same way members’ phones read it.',
      unreachable: 'The DAO’s record could not be read just now. Try again later.',
      members: 'Members', council: 'Council', councilVal: '{m} of {n}', councilSub: 'signatures per payment',
      treasury: 'Treasury', treasurySub: '{network} sats', treasuryUnread: 'not read just now', paidOut: 'Paid out', paidSub: 'in {n} rounds', paidSubOne: 'in 1 round', sats: 'sats',
      voteOpen: 'Vote open now', closesIn: 'closes in', closed: 'Voting has closed: the count follows.', voteNote: 'The count is published at the close; anyone can recheck it.',
      moreOpen: '+ {n} more open', noVote: 'No vote is open right now.', openVote: 'See the proposal',
      latestPayout: 'Latest payout', payoutFor: 'for {titles}', paidOn: 'paid {date}', onChain: 'See it on the blockchain', noPayout: 'No payout yet.',
      storyTitle: 'The story so far', day: 'Day {n}',
      sFounded: 'Founded by {n} members, with a council of {k}: {m} of {k} sign every payment.',
      sPassed: 'Vote passed: {title}.', sRejected: 'Vote did not pass: {title}.',
      sPaid: 'Paid {sats} sats, signed by the council.', sPaidFor: 'Paid {sats} sats for {titles}, signed by the council.',
      sMoved: 'The treasury moved to the new council’s wallet.', sJoined: '{name} joined.', sLeft: '{name} left.',
    },
  },
  it: {
    title: 'Costruisci la tua DAO Bitcoin',
    mission: 'Cooperare. Collaborare. Coordinarsi. Senza le carte.',
    whatTitle: 'Che cos’è una DAO?',
    whatLead: 'Un gruppo di persone che condividono uno scopo e una cassa comune, e gestiscono entrambi insieme con un’app invece che con una società registrata.',
    terms: [
      ['D', 'Decentralizzata', 'Nessuna sede centrale e nessuna persona sola a capo del denaro. Per spendere devono essere d’accordo più custodi delle chiavi.'],
      ['A', 'Autonoma', 'Il gruppo segue regole proprie, che i membri stabiliscono e cambiano con un voto. Nessun registro, banca o notaio deve approvarle.'],
      ['O', 'Organizzazione', 'Persone che lavorano insieme per qualcosa, come un circolo, un’associazione o una cooperativa. Il denaro è in bitcoin.'],
    ],
    whatNote: 'Non è una società né un ente giuridico: niente notaio, niente conto in banca, niente commercialista, niente token.',
    whatMore: 'Che cos’è una DAO, e il confronto con una cooperativa →',
    whatMoreHref: 'https://github.com/Bitcoin-DAO/btc-dao/blob/main/docs/handout.it.md',
    lead: 'Insieme, una comunità custodisce una tesoreria in bitcoin. I membri propongono e votano dal telefono; i membri del consiglio firmano ogni pagamento con la propria chiave, su un dispositivo di firma offline; chiunque può verificare ogni conteggio e ogni moneta.',
    howTitle: 'Come si costruisce una DAO',
    howLead: 'Nessuna azienda in mezzo, nessun token, nessun account. Quattro passi, fatti da chi la gestirà.',
    steps: [
      ['Taglia le chiavi', 'Ogni membro del consiglio crea una chiave al workshop: dadi, un SeedSigner, una scheda scritta a mano. Nessun computer la vede mai.'],
      ['Fondala', 'Cinque telefoni, un incontro. I fondatori si iscrivono, il consiglio approva, e la DAO esiste.'],
      ['Gestiscila', 'I membri propongono e votano. I pagamenti avvengono a turni, a rate alla consegna, firmati dal consiglio.'],
      ['Verificala', 'Ogni telefono riconta ogni voto e ricontrolla ogni pagamento sulla blockchain. Niente di cui fidarsi alla cieca.'],
    ],
    firstBuilt: 'Dashboard DAO',
    status: 'Fondazione al workshop',
    alphaText: 'Un’alfa privata su testnet4: cinque membri del consiglio, chiavi tagliate a mano in un workshop, 3 su 5 per firmare. Votazioni di prova da dieci minuti, regole vere, un registro vero.',
    enter: 'Entra in ALPHA DAO',
    pulseSoon: 'Una volta fondata ALPHA DAO, qui si vede il suo battito dal vivo: membri, tesoreria, la votazione aperta, l’ultimo pagamento.',
    facts: [['Consiglio', '3 su 5'], ['Rete', 'testnet4'], ['Membri', '—'], ['Tesoreria', '—']],
    badgeKicker: 'Badge bounty',
    badgeTitle: 'Imparare facendo',
    badgeLead: 'Nessun manuale da leggere prima. Ogni badge è una piccola bounty: fai il compito davvero, nella DAO, e la DAO ti paga qualche sat. Il badge appare da solo: il registro della DAO mostra che l’hai fatto. Quattro badge, e hai fatto ciò che fa un membro.',
    badgeFoot: 'Nessuno assegna i badge: ogni telefono li legge dal registro della DAO, quindi chiunque può verificarli. Non danno voti né gradi: ogni membro conta allo stesso modo.',
    task: 'Fai:', learn: 'Impari:', reward: '+ [n] sats',
    badges: [
      { name: 'Portafoglio', who: 'ogni membro', task: 'Aggiungi il tuo indirizzo bitcoin al profilo.', learn: 'Il tuo portafoglio, le tue chiavi: la DAO ti paga lì, e nessun altro può muovere quelle monete.', tone: 'ink' },
      { name: 'Voce', who: 'ogni membro', task: 'Vota una proposta aperta.', learn: 'Un membro, un voto, dal telefono; il conteggio è pubblico e chiunque può rifarlo.', tone: 'teal' },
      { name: 'Proponente', who: 'ogni membro', task: 'Pubblica una proposta, anche piccola.', learn: 'Come un’idea diventa una decisione: il periodo di voto, il quorum, la maggioranza necessaria.', tone: 'teal' },
      { name: 'Costruttore', who: 'ogni membro', task: 'Prendi una bounty, consegnala, scrivi il resoconto.', learn: 'Come la tesoreria paga il lavoro: alla consegna, a rate, in pubblico.', tone: 'clay' },
    ],
    newsTitle: 'Notizie dalla zona',
    newsLead: 'Brevi post, i più recenti per primi.',
    openTitle: 'Open Source',
    openText: 'Il kit è open source: l’app, il relay, la guida e le schede del workshop. Qualsiasi comunità può costruire la propria DAO.',
    code: 'Il kit: btc-dao',
    footer: 'Costruisci la tua DAO Bitcoin',
    contact: 'Contatti:',
    docTitle: 'byob.zone · Costruisci la tua DAO Bitcoin',
    live: {
      founded: 'Fondata il {date}', reading: 'Lettura del registro della DAO…', readAt: 'Letto dal registro della DAO alle {time}, come lo leggono i telefoni dei membri.',
      unreachable: 'Il registro della DAO non si può leggere in questo momento. Riprova più tardi.',
      members: 'Membri', council: 'Consiglio', councilVal: '{m} su {n}', councilSub: 'firme per pagamento',
      treasury: 'Tesoreria', treasurySub: 'sats {network}', treasuryUnread: 'non letta ora', paidOut: 'Pagati', paidSub: 'in {n} turni', paidSubOne: 'in 1 turno', sats: 'sats',
      voteOpen: 'Votazione aperta', closesIn: 'chiude tra', closed: 'La votazione è chiusa: segue il conteggio.', voteNote: 'Il conteggio è pubblicato alla chiusura; chiunque può ricontrollarlo.',
      moreOpen: '+ altre {n} aperte', noVote: 'Nessuna votazione aperta in questo momento.', openVote: 'Vedi la proposta',
      latestPayout: 'Ultimo pagamento', payoutFor: 'per {titles}', paidOn: 'pagato il {date}', onChain: 'Vedilo sulla blockchain', noPayout: 'Ancora nessun pagamento.',
      storyTitle: 'La storia finora', day: 'Giorno {n}',
      sFounded: 'Fondata da {n} membri, con un consiglio di {k}: {m} su {k} firmano ogni pagamento.',
      sPassed: 'Votazione approvata: {title}.', sRejected: 'Votazione non approvata: {title}.',
      sPaid: 'Pagati {sats} sats, firmati dal consiglio.', sPaidFor: 'Pagati {sats} sats per {titles}, firmati dal consiglio.',
      sMoved: 'La tesoreria è passata al portafoglio del nuovo consiglio.', sJoined: 'Nuovo membro: {name}.', sLeft: '{name} ha lasciato la DAO.',
    },
  },
};
