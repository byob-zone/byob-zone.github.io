import type { Lang } from './i18n';

type Strings = {
  docTitle: string; back: string; title: string; lead: string;
  howTitle: string; howLead: string; flow: [string, string][];
  cmpTitle: string; cmpLead: string; cmpTopic: string; colCoop: string; colDao: string;
  rows: [string, string, string][]; cmpNote: string; sources: string;
  knowTitle: string; know: [string, string][]; home: string;
};

export const C: Record<Lang, Strings> = {
  en: {
    docTitle: 'DAO and a co-op compared · byob.zone',
    back: '← byob.zone',
    title: 'DAO and a co-op compared',
    lead: 'A DAO does the everyday work of a small co-op: shared decisions, a shared treasury, open accounts. Here is how it works, what it costs, and what to know first.',
    howTitle: 'How it works',
    howLead: 'Members discuss, propose and vote. The council, a few members chosen by the group, hold the keys to the shared wallet: for example, any 3 of 5 must sign before money moves.',
    flow: [
      ['Discuss', 'A member posts an idea and the group discusses it in the app.'],
      ['Propose', 'The idea becomes a proposal: a payment, a new member, a rule change.'],
      ['Vote', 'Members vote over a few days; each DAO sets its own voting period.'],
      ['Sign', 'If it passes, the council signs and the payment goes out in the next payout round.'],
      ['Record', 'Everything stays on a public record: who proposed, who voted what, and where the money went.'],
    ],
    cmpTitle: 'Side by side',
    cmpLead: 'The co-op column follows Italian rules for a small co-op.',
    cmpTopic: 'Topic', colCoop: 'Small co-op', colDao: 'DAO',
    rows: [
      ['Legal status', 'Legal entity, limited liability', 'A way of organising, not a legal entity'],
      ['To start', 'Notary, statute, two registers; weeks', 'A founding meeting; a day'],
      ['Changing the rules', 'Back to the notary', 'Members vote'],
      ['Money and accounts', 'Bank account, accountant, annual statement', 'Shared bitcoin wallet; every payment public as it happens'],
      ['Setting up', 'About €2,500', 'About €60–90 for a signing device'],
      ['Each year', 'About €2,800–4,500', 'About €0–15, plus network fees'],
    ],
    cmpNote: 'Co-op figures are published estimates (November 2026) and vary by type and region; DAO figures are approximate.',
    sources: 'Sources:',
    knowTitle: 'Good to know',
    know: [
      ['Acting for the group', 'A DAO cannot sign contracts or own property in its own name. Whoever acts for the group does so in their own name, so the DAO deals with people and suppliers who accept bitcoin.'],
      ['Public by design', 'Votes and payments are visible to anyone. Members can use a nickname instead of their legal name.'],
      ['Best for small groups', 'A community project, a club, a group of makers or neighbours, with a shared purpose and a shared pot. A group that needs employees, bank loans or public grants still needs a registered form.'],
    ],
    home: 'Back to byob.zone',
  },
  it: {
    docTitle: 'DAO e cooperativa a confronto · byob.zone',
    back: '← byob.zone',
    title: 'DAO e cooperativa a confronto',
    lead: 'Una DAO svolge il lavoro quotidiano di una piccola cooperativa: decisioni condivise, una tesoreria comune, conti aperti a tutti. Ecco come funziona, quanto costa, e cosa sapere prima.',
    howTitle: 'Come funziona',
    howLead: 'I membri discutono, propongono e votano. Il consiglio, pochi membri scelti dal gruppo, tiene le chiavi del portafoglio comune: per esempio, devono firmare 3 su 5 prima che il denaro si muova.',
    flow: [
      ['Discuti', 'Un membro pubblica un’idea e il gruppo ne discute nell’app.'],
      ['Proponi', 'L’idea diventa una proposta: un pagamento, un nuovo membro, un cambio di regole.'],
      ['Vota', 'I membri votano per qualche giorno; ogni DAO stabilisce il proprio periodo di voto.'],
      ['Firma', 'Se passa, il consiglio firma e il pagamento parte al turno di pagamento successivo.'],
      ['Registra', 'Tutto resta in un registro pubblico: chi ha proposto, chi ha votato cosa, e dove è andato il denaro.'],
    ],
    cmpTitle: 'Fianco a fianco',
    cmpLead: 'La colonna della cooperativa segue le regole italiane per una piccola cooperativa.',
    cmpTopic: 'Voce', colCoop: 'Piccola cooperativa', colDao: 'DAO',
    rows: [
      ['Forma giuridica', 'Ente con responsabilità limitata', 'Un modo di organizzarsi, non un ente giuridico'],
      ['Per partire', 'Notaio, statuto, due registri; settimane', 'Un incontro di fondazione; un giorno'],
      ['Cambiare le regole', 'Si torna dal notaio', 'Votano i membri'],
      ['Denaro e conti', 'Conto in banca, commercialista, bilancio annuale', 'Portafoglio bitcoin comune; ogni pagamento pubblico mentre avviene'],
      ['Costituzione', 'Circa 2.500 €', 'Circa 60–90 € per un dispositivo di firma'],
      ['Ogni anno', 'Circa 2.800–4.500 €', 'Circa 0–15 €, più le commissioni di rete'],
    ],
    cmpNote: 'Le cifre della cooperativa sono stime pubblicate (novembre 2026) e variano per tipo e regione; quelle della DAO sono approssimative.',
    sources: 'Fonti:',
    knowTitle: 'Da sapere',
    know: [
      ['Agire per il gruppo', 'Una DAO non può firmare contratti né possedere beni a proprio nome. Chi agisce per il gruppo lo fa a nome proprio, quindi la DAO tratta con persone e fornitori che accettano bitcoin.'],
      ['Pubblica per scelta', 'Voti e pagamenti sono visibili a tutti. I membri possono usare uno pseudonimo invece del nome legale.'],
      ['Ideale per piccoli gruppi', 'Un progetto di comunità, un circolo, un gruppo di artigiani o di vicini, con uno scopo e una cassa comuni. Un gruppo che ha bisogno di dipendenti, prestiti bancari o contributi pubblici ha ancora bisogno di una forma registrata.'],
    ],
    home: 'Torna a byob.zone',
  },
};
