<template>
  <b-container id="homeView" data-view>
    <section
      id="sectionA"
      :style="{
        display: 'grid',
        placeItems: 'center',
        minHeight: 'calc(100vh - 76px)',
      }"
    >
      <b-col
        class="d-flex flex-column justify-content-center align-items-center"
      >
        <img
          id="logoImg"
          :src="
            $store.getters.isChristmasTime
              ? '/Icon-Christmas.png'
              : $store.getters.isEasterTime
              ? '/Icon-Easter.png'
              : '/Icon.png'
          "
          alt="Choreo Planer Icon"
          width="200"
          height="200"
        />
        <h1 id="title" class="text-center display-4">Dein Choreo Planer</h1>
        <b-row
          class="w-75 my-4"
          align-h="around"
          :style="{ fontWeight: 'bold' }"
        >
          <b-col cols="auto" id="callout1"> 1. Choreos erstellen </b-col>
          <b-col cols="auto" id="callout2"> 2. Countsheets teilen </b-col>
          <b-col cols="auto" id="callout3"> 3. Videos erstellen </b-col>
        </b-row>
        <b-button
          id="registerButton"
          variant="primary"
          :to="{ name: 'Login' }"
          class="my-4"
          :style="{ textWrap: 'no-wrap' }"
        >
          Anmelden / Registrieren
        </b-button>
        <router-link id="helpLink" :to="{ name: 'Help' }"> Hilfe </router-link>
      </b-col>
    </section>

    <section
      id="sectionB"
      :style="{
        display: 'grid',
        placeItems: 'center',
      }"
    >
      <b-row align-v="center" align-h="center" class="w-100">
        <b-col cols="12" lg="6" class="mb-lg-0 mb-2">
          <h2>📝 Choreos erstellen</h2>
          <ol>
            <li>Gib deiner Choreo einen Namen</li>
            <li>
              Erstelle Aufstellungen, indem du die Punkte auf der Matte an die
              richtige Stelle ziehst
            </li>
            <li>
              Bestimme, wie lange die Aufstellungen gehalten werden sollen und
              von wem
            </li>
            <li>Mache Einträge in dein Countsheet, wer wann was macht</li>
          </ol>
        </b-col>
        <b-col cols="auto">
          <Mat
            :currentPositions="currentPositions"
            :width="matWidth"
            :height="matWidth"
            :teamMembers="teamMembers"
            :interactive="false"
            :dotRadius="(matWidth / 500) * 20"
          />
        </b-col>
      </b-row>
    </section>

    <div id="featureCallouts1" class="featureCallouts d-none d-md-flex">
      <b-col class="featureCallout h3">
        <b-icon-people-fill /><br />
        Mitgliederverwaltung
        <ul>
          <li>Vereine</li>
          <li>Teams</li>
          <li>Seasonkader</li>
          <li>Teilnehmer</li>
        </ul>
      </b-col>
      <b-col class="featureCallout h3">
        <b-icon-layout-three-columns /><br />
        Choreoplanung
        <ul>
          <li>Aufstellungen</li>
          <li>Countsheets</li>
          <li>Verwaltung nach Season</li>
          <li>Teilnehmer</li>
        </ul>
      </b-col>
      <b-col class="featureCallout h3">
        <b-icon-file-pdf-fill /><br />
        Dateigenerierung
        <ul>
          <li>Videos als MP4 und WEBM</li>
          <li>Countsheet als PDF</li>
          <li>Aufstellungen als Bild</li>
        </ul>
      </b-col>
      <b-col class="featureCallout h3">
        <b-icon-film /><br />
        Video-Export
        <ul>
          <li>Teile Choreos einfach als Video</li>
          <li>Generierung lokal im Browser</li>
          <li>Download als MP4 oder WEBM</li>
        </ul>
      </b-col>
      <b-col class="featureCallout h3">
        <b-icon-shield-fill-check /><br />
        Datensicherung
        <ul>
          <li>Speicherung auf unseren Servern</li>
          <li>Per Passwort gesicherter Datenzugriff</li>
          <li>Verschlüsselter Datentransfer</li>
        </ul>
      </b-col>
      <b-col class="featureCallout h3">
        <b-icon-calendar2-range-fill /><br />
        Seasonwechsel
        <ul>
          <li>Starte neue Seasons, wenn du soweit bist</li>
          <li>Importiere Teilnehmer in neue Seasonkader</li>
          <li>
            Definiere eigene Seasons, die sich nicht an das Wettkampfjahr halten
          </li>
        </ul>
      </b-col>
      <b-col class="featureCallout h3">
        <b-icon-trophy-fill /><br />
        Meisterschaftsvorbereitung
        <ul>
          <li>Bereite Choreos speziell für Meisterschaften vor</li>
          <li>Gib Videos und Countsheets an deine Teilnehmer mit nach Hause</li>
          <li>Mache Last-Minute-Auswechslungen ganz einfach mit 2-3 Klicks</li>
        </ul>
      </b-col>
      <b-col class="featureCallout h3">
        <b-icon-archive-fill /><br />
        Datenarchivierung
        <ul>
          <li>Regelmäßige Datensicherung auf unserem Server</li>
          <li>
            Deine Daten werden nur für die Darstellung deiner Choreos verwendet
          </li>
        </ul>
      </b-col>
    </div>

    <section id="sectionC">
      <b-row align-h="center">
        <b-col cols="12" lg="6" class="mb-lg-0 mb-2">
          <h2>🫰 Countsheets teilen</h2>
          <ol>
            <li>
              Mache Einträge ins Countsheet, während du deine Choreo erstellst
            </li>
            <li>
              Bestimme für jeden Eintrag, ob er für alle oder nur für bestimmte
              Teilnehmerinnen und Teilnehmer gilt
            </li>
            <li>
              Erstelle Countsheets als Video oder als PDF für alle oder nur für
              bestimmte Teilnehmerinnen und Teilnehmer
            </li>
          </ol>
        </b-col>

        <b-col cols="12" lg="6" :style="{ minHeight: '400px' }">
          <CountOverview
            id="CountOverview"
            :count="count"
            :choreo="choreo"
            :hitsForCurrentCount="hitsForCurrentCount"
            :lineupsForCurrentCount="[]"
            :teamMembers="teamMembers"
            :interactive="false"
          />
        </b-col>
        <b-col cols="12" class="d-none d-md-flex flex-column">
          <CountSheet
            id="CountSheet"
            :count="count"
            :choreo="choreo"
            :interactive="false"
          />
          <small class="text-muted text-center">Beispiel-Countsheet</small>
        </b-col>
      </b-row>
    </section>

    <div
      id="featureCallouts2"
      class="featureCallouts row-reverse d-none d-md-flex"
    >
      <b-col class="featureCallout h3">
        <b-icon-person-plus-fill /><br />
        1. Anmelden
        <ol>
          <li>Anmelden mit Benutzername und Passwort</li>
          <li>Gib deinem ersten Verein einen Namen</li>
        </ol>
      </b-col>
      <b-col class="featureCallout h3">
        <b-icon-people-fill /><br />
        2. Team anlegen
        <ol>
          <li>Name deines Teams</li>
          <li>Aktuelle Season des Teams</li>
          <li>Seasonkader füllen</li>
        </ol>
      </b-col>
      <b-col class="featureCallout h3">
        <b-icon-layout-three-columns /><br />
        3. Choreos planen
        <ol>
          <li>Name der Choreo</li>
          <li>Länge in Counts & Achtern</li>
          <li>Aufstellungen</li>
          <li>Einträge im Countsheet</li>
        </ol>
      </b-col>
      <b-col class="featureCallout h3">
        <b-icon-download /><br />
        4. Videos herunterladen
        <ol>
          <li>Generiere das Video</li>
          <li>Lade das Video runter</li>
          <li>Teile es in eurem Team-Chat</li>
        </ol>
      </b-col>
      <b-col class="featureCallout h3">
        <div>
          <b-icon-chat-fill />
          <b-icon-file-earmark-arrow-up-fill />
        </div>
        <br />
        5. Countsheets teilen
        <ol>
          <li>Fülle das Countsheet</li>
          <li>Lade das PDF herunten</li>
          <li>Teile es in eurem Team-Chat</li>
        </ol>
      </b-col>
    </div>

    <section id="sectionD">
      <b-row align-h="center">
        <b-col cols="12" lg="6">
          <h2>🎞️ Videos erstellen</h2>
          <ol>
            <li>Wenn du zufrieden bist, gehe zu "als Video exportieren"</li>
            <li>
              Wähle aus, ab du ein Video mit allen auf der Matte oder
              ausgewählten Personen haben willst
            </li>
            <li>Warte, bis dein Video fertig ist</li>
          </ol>
        </b-col>
        <b-col cols="12" lg="6">
          <b-form id="video-form">
            <b-form-group
              id="checkbox1"
              description="Wähle aus, wer auf dem Video erscheinen soll"
            >
              <b-form-checkbox-group
                id="selectMembers"
                v-model="selectedTeamMembers"
                :options="
                  teamMembers.map((t) => ({
                    text: t.nickname,
                    value: t.abbreviation,
                  }))
                "
                stacked
              />
            </b-form-group>
            <b-form-group
              id="checkbox2"
              description="Soll das Video mit deinem Logo erstellt werden?"
            >
              <b-form-checkbox :checked="true">Mit Logo</b-form-checkbox>
            </b-form-group>
            <b-form-group
              id="checkbox3"
              description="Soll das Video mit deinem Vereins- und Mannschaftsnamen erstellt werden?"
            >
              <b-form-checkbox :checked="true">Mit Namen</b-form-checkbox>
            </b-form-group>
            <b-form-group
              id="checkbox4"
              description="Soll das Video einen durchlaufendem Count haben?"
            >
              <b-form-checkbox :checked="true">Mit Count</b-form-checkbox>
            </b-form-group>
            <b-form-group
              id="checkbox5"
              description="Soll das Video Einträge aus dem Countsheet zeigen?"
            >
              <b-form-checkbox :checked="true">
                Mit Countsheet-Einträgen
              </b-form-checkbox>
            </b-form-group>
          </b-form>
        </b-col>
      </b-row>
    </section>

    <div
      :style="{
        backgroundColor: 'var(--success)',
        color: 'white',
        marginBottom: '10vh',
        borderRadius: '4px',
      }"
      class="text-center py-5 px-3"
    >
      <h2 class="mb-1">Interesse geweckt?</h2>
      <p class="mb-4">
        Zum Loslegen einfach anmelden und das erste Team anlegen:
      </p>
      <b-button
        :style="{ backgroundColor: 'white', color: 'var(--success)' }"
        class="pulse-button"
      >
        Anmelden / Registrieren
      </b-button>
    </div>
  </b-container>
</template>

<script>
import CountOverview from "@/components/CountOverview.vue";
import CountSheet from "@/components/CountSheet.vue";
import Mat from "@/components/Mat.vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

export default {
  name: "HomeView",
  components: {
    Mat,
    CountSheet,
    CountOverview,
  },
  data: () => ({
    count: 0,
    teamMembers: [
      {
        id: "a",
        name: "Anna Unersetzlich",
        abbreviation: "AU",
        nickname: "Anni",
        ChoreoParticipation: {
          color: "#dd45a8",
        },
      },
      {
        id: "m",
        name: "Maxi Supidupi",
        abbreviation: "MS",
        nickname: "Maxi",
        ChoreoParticipation: {
          color: "#00ee8a",
        },
      },
      {
        id: "t",
        name: "Theresa Toll",
        abbreviation: "TT",
        nickname: "Theresa",
        ChoreoParticipation: {
          color: "#0000aa",
        },
      },
      {
        id: "p",
        name: "Paulina Flickflack",
        abbreviation: "PF",
        nickname: "Pauli",
        ChoreoParticipation: {
          color: "#FFFF22",
        },
      },
    ],
    choreo: {
      counts: 40,
      Hits: [
        {
          name: "Umdrehen",
          count: 0,
          Members: [
            {
              id: "a",
              name: "Anna Unersetzlich",
              abbreviation: "AU",
              nickname: "Anni",
              ChoreoParticipation: {
                color: "#dd45a8",
              },
            },
          ],
        },
        {
          name: "Dip 1",
          count: 0,
          Members: [
            {
              id: "m",
              name: "Maxi Supidupi",
              abbreviation: "MS",
              nickname: "Maxi",
              ChoreoParticipation: {
                color: "#00ee8a",
              },
            },
          ],
        },
        {
          name: "Schultern zu",
          count: 2,
        },
        {
          name: "Low v",
          count: 4,
        },
        {
          name: "Schritt",
          count: 6,
        },
        {
          name: "Flick Flack",
          count: 8,
          Members: [
            {
              id: "m",
              name: "Maxi Supidupi",
              abbreviation: "MS",
              nickname: "Maxi",
              ChoreoParticipation: {
                color: "#00ee8a",
              },
            },
          ],
        },
        {
          name: "Flugrolle",
          count: 8,
          Members: [
            {
              id: "a",
              name: "Anna Unersetzlich",
              abbreviation: "AU",
              nickname: "Anni",
              ChoreoParticipation: {
                color: "#dd45a8",
              },
            },
          ],
        },
        {
          name: "Flick Flack",
          count: 10,
        },
        {
          name: "Aufstehen 1",
          count: 12,
        },
        {
          name: "Rauslaufen",
          count: 12,
        },
        {
          name: "Aufstehen 2",
          count: 14,
        },
        {
          name: "Rolle 1",
          count: 14,
        },
        {
          name: "Arme einst.",
          count: 16,
        },
        {
          name: "Flugrolle",
          count: 16,
        },
        {
          name: "1 n. unten re.",
          count: 18,
        },
        {
          name: "1 n. unten li.",
          count: 19,
        },
        {
          name: "Arme Bogen über Seite in 7",
          count: 20,
        },
        {
          name: "Beginn Motions",
          count: 22,
        },
        {
          name: "Clap",
          count: 26,
        },
        {
          name: "High Clap",
          count: 27,
        },
        {
          name: "Hurdler",
          count: 29,
        },
        {
          name: "Toe-Touch",
          count: 31,
        },
        {
          name: "Aufstehen",
          count: 34,
        },
        {
          name: "clean",
          count: 36,
        },
        {
          name: "Clap",
          count: 37,
        },
        {
          name: "High Clap",
          count: 38,
        },
      ],
      Lineups: [],
    },
    currentPositions: [
      {
        MemberId: "a",
        Member: {
          id: "a",
          name: "Anna Unersetzlich",
          abbreviation: "AU",
          nickname: "Anni",
          ChoreoParticipation: {
            color: "#dd45a8",
          },
        },
        x: 40,
        y: 50,
      },
      {
        MemberId: "m",
        Member: {
          id: "m",
          name: "Maxi Supidupi",
          abbreviation: "MS",
          nickname: "Maxi",
          ChoreoParticipation: {
            color: "#00ee8a",
          },
        },
        x: 60,
        y: 50,
      },
      {
        MemberId: "t",
        Member: {
          id: "t",
          name: "Theresa Toll",
          abbreviation: "TT",
          nickname: "Theresa",
          ChoreoParticipation: {
            color: "#0000aa",
          },
        },
        x: 45,
        y: 10,
      },
      {
        MemberId: "p",
        Member: {
          id: "p",
          name: "Paulina Flickflack",
          abbreviation: "PF",
          nickname: "Pauli",
          ChoreoParticipation: {
            color: "#FFFF22",
          },
        },
        x: 55,
        y: 10,
      },
    ],
    selectedTeamMembers: [],
  }),
  metaInfo: {
    title: "Choreo Planer | Das kostenlose Online-Tool für Choreo-Sport",
    titleTemplate: null,
    meta: [
      {
        vmid: "description",
        name: "description",
        content:
          "Plane deine Choreografien schnell und einfach mit dem Choreo Planer! Perfekt für Cheerleading, Tanz und Bodenturnen. 100% kostenlos. Jetzt ausprobieren!",
      },
      {
        vmid: "twitter:description",
        name: "twitter:description",
        content:
          "Plane deine Choreografien schnell und einfach mit dem Choreo Planer! Perfekt für Cheerleading, Tanz und Bodenturnen. 100% kostenlos. Jetzt ausprobieren!",
      },
      {
        vmid: "og:description",
        property: "og:description",
        content:
          "Plane deine Choreografien schnell und einfach mit dem Choreo Planer! Perfekt für Cheerleading, Tanz und Bodenturnen. 100% kostenlos. Jetzt ausprobieren!",
      },
      {
        vmid: "og:title",
        property: "og:title",
        content: "Choreo Planer | Das kostenlose Online-Tool für Choreo-Sport",
      },
      {
        vmid: "twitter:title",
        name: "twitter:title",
        content: "Choreo Planer | Das kostenlose Online-Tool für Choreo-Sport",
      },
    ],
  },
  computed: {
    hitsForCurrentCount() {
      return this.choreo.Hits.filter((h) => h.count == this.count).map((h) => ({
        ...h,
        id: (Math.random() + 1).toString(36).substring(7),
      }));
    },
    matWidth() {
      const w = document.getElementById("app")?.clientWidth;
      if (w < 576) return 300;
      else if (w < 992) return 400;
      else return 500;
    },
  },
  mounted() {
    this.selectedTeamMembers = this.teamMembers.map((t) => t.abbreviation);

    const tl = gsap.timeline();

    tl.from("#logoImg", {
      x: "-50vw",
      rotate: -360,
      duration: 1,
    });
    tl.from(
      "#title",
      {
        opacity: 0,
        duration: 1,
      },
      "<"
    );
    tl.from(
      "#callout1",
      {
        y: "50",
        opacity: 0,
        duration: 1,
        delay: 0.2,
      },
      "<+=0.2"
    );
    tl.from(
      "#callout2",
      {
        y: "50",
        opacity: 0,
        duration: 1,
        delay: 0.4,
      },
      "<+=0.2"
    );
    tl.from(
      "#callout3",
      {
        y: "50",
        opacity: 0,
        duration: 1,
        delay: 0.6,
      },
      "<+=0.2"
    );

    gsap.registerPlugin(ScrollTrigger);

    gsap.to("#registerButton", {
      scrollTrigger: {
        trigger: "#sectionA",
        start: "center center",
        end: "bottom 20%",
        scrub: -1,
      },
      y: "15vh",
      width: "100%",
    });
    gsap.to("#helpLink", {
      scrollTrigger: {
        trigger: "#sectionA",
        start: "center center",
        end: "bottom 20%",
        scrub: -1,
      },
      y: "15vh",
      opacity: 0,
    });

    const homeViewWidth = document.getElementById("homeView").clientWidth;
    const featureCallouts1Width =
      document.getElementById("featureCallouts1").clientWidth;
    const featureCallouts2Width =
      document.getElementById("featureCallouts2").clientWidth;

    gsap.to("#featureCallouts1", {
      scrollTrigger: {
        trigger: "#featureCallouts1",
        start: "center center",
        end: `+=${featureCallouts1Width - homeViewWidth}`,
        scrub: -1,
        pin: true,
        anticipatePin: 1,
      },
      x: homeViewWidth - featureCallouts1Width,
    });
    gsap.from("#featureCallouts2", {
      scrollTrigger: {
        trigger: "#featureCallouts2",
        start: "center center",
        end: `+=${featureCallouts2Width - homeViewWidth}`,
        scrub: -1,
        pin: true,
        anticipatePin: 1,
      },
      x: homeViewWidth - featureCallouts2Width,
    });

    const scrollTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: "#sectionB",
        start: "top 70%",
        end: "bottom center",
        scrub: -1,
      },
    });

    const matAnimations = [
      {
        id: "a",
        positions: [
          {
            x: 0.08,
            y: 0.12,
          },
          {
            x: 0.5,
            y: 0.12,
          },
          {
            x: 0.5,
            y: 0.84,
          },
        ],
      },
      {
        id: "m",
        positions: [
          {
            x: 0.92,
            y: 0.12,
          },
          {
            x: 0.5,
            y: 0.5,
          },
          {
            x: 0.5,
            y: 0.9,
          },
        ],
      },
      {
        id: "t",
        positions: [
          {
            x: 0.46,
            y: 0.5,
          },
          {
            x: 0.12,
            y: 0.5,
          },
          {
            x: 0.46,
            y: 0.9,
          },
        ],
      },
      {
        id: "p",
        positions: [
          {
            x: 0.54,
            y: 0.5,
          },
          {
            x: 0.88,
            y: 0.5,
          },
          {
            x: 0.54,
            y: 0.9,
          },
        ],
      },
    ];

    matAnimations.forEach(({ id, positions }) => {
      scrollTimeLine.to(
        `#t${id}`,
        {
          keyframes: positions.map((p) => ({
            ease: p.ease,
            x: p.x * this.matWidth,
            y: p.y * this.matWidth,
          })),
        },
        "<"
      );
      scrollTimeLine.to(
        `#c${id}`,
        {
          keyframes: positions.map((p) => ({
            ease: p.ease,
            cx: p.x * this.matWidth,
            cy: p.y * this.matWidth,
          })),
        },
        "<"
      );
    });

    ScrollTrigger.create({
      trigger: "#CountOverview",
      start: "top 40%",
      endTrigger: "#sectionC",
      end: "bottom center",
      scrub: -1,
      onUpdate: (self) => {
        this.count = Math.floor(4 * self.progress) * 2;
      },
    });
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-weight: 800;
}

h2 {
  text-align: center;
  section > & {
    color: #0069d9;
  }
  font-weight: bold;
  margin-bottom: 32px;
}

section {
  min-height: 70vh;
  display: grid;
  place-items: center;
  &:not(#sectionA) {
    padding: 20vh 0;
  }
  & > .row {
    row-gap: 10vh;
  }
}

ol,
ul {
  font-size: large;
  margin-left: 20px;
  margin-bottom: 0;
  & > li {
    margin-bottom: 8px;
  }
}

.featureCallouts {
  display: flex;
  width: fit-content;
  margin: 10vh 0;

  &.row-reverse {
    flex-direction: row-reverse;

    .featureCallout {
      &:nth-of-type(1) {
        margin-right: 0;
        margin-left: 48px;
      }
      &:last-of-type {
        margin-left: 0;
        margin-right: 48px;
      }
    }
  }

  .featureCallout {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: max-content;
    hyphens: manual;
    font-weight: 800;
    font-size: 2em;
    text-align: center;
    margin: 0 48px;

    & > ul,
    & > ol {
      text-align: start;
      margin-top: 24px;
      margin-left: 24px;
      font-weight: initial;
    }

    & .b-icon {
      font-size: 60px;
      margin-bottom: 16px;
    }

    &:nth-of-type(1) {
      margin-left: 0;
    }
    &:last-of-type {
      margin-right: 0;
    }
  }
}

.pulse-button {
  box-shadow: 0 0 0 0 white;
  -webkit-animation: pulsing 2s infinite cubic-bezier(0.66, 0, 0, 1);
  -moz-animation: pulsing 2s infinite cubic-bezier(0.66, 0, 0, 1);
  -ms-animation: pulsing 2s infinite cubic-bezier(0.66, 0, 0, 1);
  animation: pulsing 2s infinite cubic-bezier(0.66, 0, 0, 1);
}

.pulse-button:hover {
  -webkit-animation: none;
  -moz-animation: none;
  -ms-animation: none;
  animation: none;
  color: #ffffff;
}

@-webkit-keyframes pulsing {
  50% {
    box-shadow: 0 0 0 20px #6927d300;
  }
  100% {
    box-shadow: 0 0 0 20px #6927d300;
  }
}

@-moz-keyframes pulsing {
  50% {
    box-shadow: 0 0 0 20px #6927d300;
  }
  100% {
    box-shadow: 0 0 0 20px #6927d300;
  }
}

@-ms-keyframes pulsing {
  50% {
    box-shadow: 0 0 0 20px #6927d300;
  }
  100% {
    box-shadow: 0 0 0 20px #6927d300;
  }
}

@keyframes pulsing {
  50% {
    box-shadow: 0 0 0 20px #6927d300;
  }
  100% {
    box-shadow: 0 0 0 20px #6927d300;
  }
}
</style>
