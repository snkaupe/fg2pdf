import React, { JSX } from "react";
import CharacterHeader from "./CharacterHeader";
import Page from "../Page";

type SpellLevel = number;
type ClassName = string;
type GroupName = string;

interface SpellsProps {
  character: any;
}

interface Power {
  name: string;
  prepared: boolean;
  group: string;
}

interface Damage {
  dice: string;
  type: string;
  bonus: number;
  stat: string | undefined;
}

interface Weapon {
  name: string;
  properties: string;
  attackBonus: number;
  damages: Damage[];
  ammo: number;
  maxAmmo: number;
}

interface Spell {
  name: string;
  group: GroupName,
  school: string;
  level: SpellLevel;
  range: number;
  castingTime: string;
  duration: string;
  components: string;
  prepared: number;
}

interface SavingThrow {
  saveType: string;
  saveMagic: number;
  actionType: string;
  onMissDamage: string;
  savedCBase: string;
  savedCStat: string;
}

interface PowerAction {
  savingThrow: SavingThrow | undefined;
  damageList: Damage[] | undefined;
}

interface Feature {
  name: string;
  description: string;
  actions: PowerAction[];
}

interface CharacterActions {
  weapons: Weapon[];
  spellSlots: number[];
  pactSlots: number[];
  magicSpells: Map<ClassName, Map<SpellLevel, Spell[]>>;
  speciesPowers: Feature[];
  classPowers: Map<ClassName, Feature[]>;
  otherPowers: Map<GroupName, Feature[]>;
}

class PowerGroup {
  actions: (JSX.Element | string)[];

  constructor() {
    this.actions = [];
  }
}

const MAX_SPELLS_LINES = 26;

const parseDamageList = (damagelist: any): Damage[] => {
  let damages: Damage[] = [];

  if (damagelist && damagelist.length) {
    const keys = Object.keys(damagelist[0]);
    keys.forEach((key) => {
      let damage: Damage = {
        dice: damagelist[0][key][0].dice[0]._,
        type: damagelist[0][key][0].type[0]._,
        bonus: parseInt(damagelist[0][key][0].bonus[0]._),
        stat: damagelist[0][key][0].stat ? damagelist[0][key][0].stat[0]._ : undefined
      };
      if (damage.dice.startsWith("d")) {
        damage.dice = `1${damage.dice}`
      }
    });
    return damages;
  }

  return damages;
};

const getPowers = (powers: any): Power[] => {
  let allPowers: Power[] = [];

  powers.forEach((power: any) => {
    const keys = Object.keys(power);
    keys.forEach((key) => {
      const curPower = power[key][0];
      let group =
        curPower.group && curPower.group.length
          ? curPower.group[0]._
          : "Powers";
      const level =
        curPower.level && curPower.level.length ? curPower.level[0]._ : "";
      const name =
        curPower.name && curPower.name.length ? curPower.name[0]._ : "";
      let prepared = true;
      if (level !== "0" && level !== "") {
        if (curPower.prepared && curPower.prepared.length) {
          prepared = curPower.prepared[0]._ !== "0";
        }
      }

      if (
        group
          .toLowerCase()
          .trim()
          .match(/spells/i) &&
        level === "0"
      ) {
        group = `Cantrips`;
      } else if (
        group
          .toLowerCase()
          .trim()
          .match(/spells/i) &&
        level === "1"
      ) {
        group = `1st Level ${group}`;
      } else if (
        group
          .toLowerCase()
          .trim()
          .match(/spells/i) &&
        level === "2"
      ) {
        group = `2nd Level ${group}`;
      } else if (
        group
          .toLowerCase()
          .trim()
          .match(/spells/i) &&
        level === "3"
      ) {
        group = `3rd Level ${group}`;
      } else if (
        group
          .toLowerCase()
          .trim()
          .match(/spells/i) &&
        level === "4"
      ) {
        group = `4th Level ${group}`;
      } else if (
        group
          .toLowerCase()
          .trim()
          .match(/spells/i) &&
        level === "5"
      ) {
        group = `5th Level ${group}`;
      } else if (
        group
          .toLowerCase()
          .trim()
          .match(/spells/i) &&
        level === "6"
      ) {
        group = `6th Level ${group}`;
      } else if (
        group
          .toLowerCase()
          .trim()
          .match(/spells/i) &&
        level === "7"
      ) {
        group = `7th Level ${group}`;
      } else if (
        group
          .toLowerCase()
          .trim()
          .match(/spells/i) &&
        level === "8"
      ) {
        group = `8st Level ${group}`;
      } else if (
        group
          .toLowerCase()
          .trim()
          .match(/spells/i) &&
        level === "9"
      ) {
        group = `9th Level ${group}`;
      }

      allPowers.push({
        name,
        group,
        prepared,
      });
    });

    // Sort powers by group and name
    allPowers.sort((p1, p2) => {
      if (p1.group === "Cantrips") {
        return -1;
      }
      if (p2.group === "Cantrips") {
        return 1;
      }
      if (p1.group < p2.group) {
        return -1;
      } else if (p1.group > p2.group) {
        return 1;
      } else {
        if (p1.name < p2.name) {
          return -1;
        } else if (p1.name > p2.name) {
          return 1;
        }
        return 0;
      }
    });
  });

  return allPowers;
};

const parseMagicSlotList = (obj: any, slotName: string): number[] => {
  let slots: number[] = [];
  for (let i = 1; i <= 9; i++) {
    slots[i - 1] = parseInt(obj[`${slotName}${i}` as keyof any][0].max[0]._, 10);
  }
  return slots;
};

const parseActions = (actionsData: any): PowerAction[] => {
  let actions: PowerAction[] = [];
  console.log("actionsData:");
  console.log(actionsData);
  const keys = Object.keys(actionsData[0]);
  keys.forEach((key) => {
    if (!actionsData || ! actionsData[0]) {
      return; // Leave lambda function
    }
    const currentAction = actionsData[0][key][0];
    console.log("Checking action:");
    console.log(currentAction);
    let action: PowerAction = {
      savingThrow: undefined,
      damageList: undefined
    };
    if (actionHasProperty(currentAction, "savetype")) {
      console.log("Saving Throw");
      // Action is a saving throw
      action.savingThrow = {
        saveType: getPowerProperty(currentAction, "savetype"),
        saveMagic: getPowerNumberProperty(currentAction, "savemagic"),
        actionType: getPowerProperty(currentAction, "type"),
        onMissDamage: getPowerProperty(currentAction, "onmissdamage"),
        savedCBase: getPowerProperty(currentAction, "savedcbase"),
        savedCStat: getPowerProperty(currentAction, "savedcstat"),
      };
    } else if (actionHasProperty(currentAction, "damagelist")) {
      console.log("Damage List");
      // Parse a damage list
      action.damageList = parseDamageList(currentAction[0].damagelist);
    }
    actions.push(action);
  });
  return actions;
}

const actionHasProperty = (action: any, propName: string): boolean => {
  return action[propName as keyof any] && action[propName as keyof any].length;
};

const getPowerProperty = (power: any, propName: string, defaultValue: string = ""): string => {
  return power[propName as keyof any] && power[propName as keyof any].length ? power[propName as keyof any][0]._ : defaultValue;
};

const getPowerNumberProperty = (power: any, propName: string, defaultValue: number = 0): number => {
  return power[propName as keyof any] && power[propName as keyof any].length ? parseInt(power[propName as keyof any][0]._, 10) : defaultValue;
};

const parseSpellsAndPowers = (powers: any, model: CharacterActions) => {
  powers.forEach((power: any) => {
    const keys = Object.keys(power);
    keys.forEach((key) => {
      const currentPower = power[key][0];
      let group: GroupName = getPowerProperty(currentPower, "group", "Powers");
      if (group.startsWith("Class")) {
        // Power is a class feature
      } else if (group.startsWith("Species")) {
        // Power is related to the character's species, e.g. a Dragonborn's breath weapon
        let speciesPower: Feature = {
          name: getPowerProperty(currentPower, "name"),
          description: getPowerProperty(currentPower, "description"),
          actions: parseActions(currentPower.actions)
        };
        model.speciesPowers.push(speciesPower);
      } else if (group.startsWith("Spells")) {
        // Power is some kind of spell
        let spell: Spell = {
          name: getPowerProperty(currentPower, "name"),
          group: group,
          school: getPowerProperty(currentPower, "school"),
          level: getPowerNumberProperty(currentPower, "level"),
          range: getPowerNumberProperty(currentPower, "range"),
          castingTime: getPowerProperty(currentPower, "castingtime"),
          duration: getPowerProperty(currentPower, "duration"),
          components: getPowerProperty(currentPower, "components"),
          prepared: getPowerNumberProperty(currentPower, "prepared"),
        };
        const originMatch = group.match(/Spells \((\w+)\)/);
        if (originMatch && originMatch.length === 2) {
          const originClass = originMatch[1];
          if (!model.magicSpells.has(originClass)) {
            model.magicSpells.set(originClass, new Map());
          }
          if (!model.magicSpells.get(originClass)?.has(spell.level)) {
            model.magicSpells.get(originClass)?.set(spell.level, []);
          }
          model.magicSpells.get(originClass)?.get(spell.level)?.push(spell);
        }
      }
    })
  })
}

export const powerToString = (power: Power): string | JSX.Element => {
  return <span><span>{power.prepared ? "✓" : ""}</span><span>{power.name}</span></span>;
  // return `${power.prepared ? "✓" : ""} ${power.name}`;
};

export const Actions = ({ character }: SpellsProps) => {
  const { powers, powermeta: slots, weaponlist: weaponList } = character;

  const allFeatures: (string | JSX.Element)[] = [];

  let model: CharacterActions = {
    weapons: [],
    spellSlots: [],
    pactSlots: [],
    magicSpells: new Map(),
    speciesPowers: [],
    classPowers: new Map(),
    otherPowers: new Map(),
  };

  // Parse out weapons
  const weaponsAlreadyAdded: Set<string> = new Set();
  if (weaponList && weaponList.length > 0) {
    weaponList.forEach((weaponKeys: any) => {
      const keys = Object.keys(weaponKeys);
      keys.forEach((key) => {
        const weaponData = weaponKeys[key][0];
        let weapon: Weapon = {
          name: weaponData.name ? weaponData.name[0]._ : "",
          properties: weaponData.properties ? weaponData.properties[0]._ : "",
          attackBonus: weaponData.attackbonus ? weaponData.attackbonus[0]._ : 0,
          damages: parseDamageList(weaponData.damagelist),
          ammo: weaponData.ammo ? parseInt(weaponData.ammo[0]._, 10) : 0,
          maxAmmo: weaponData.maxammo ? parseInt(weaponData.maxammo[0]._, 10) : 0,
        };
        
        if (!weaponsAlreadyAdded.has(weapon.name)) {
          model.weapons.push(weapon);
          weaponsAlreadyAdded.add(weapon.name);
        }
      });
    });
  }

  // Add Spell Slots
  if (
    slots &&
    slots[0] &&
    slots[0].spellslots1 &&
    slots[0].spellslots1[0] &&
    slots[0].spellslots1[0].max &&
    parseInt(slots[0].spellslots1[0].max[0]._, 10) > 0
  ) {
    model.spellSlots = parseMagicSlotList(slots[0], "spellslots");
  }

  // Add Pact Magic
  if (
    slots &&
    slots[0] &&
    slots[0].pactmagicslots1 &&
    slots[0].pactmagicslots1[0] &&
    slots[0].pactmagicslots1[0].max
  ) {
    model.pactSlots = parseMagicSlotList(slots[0], "pactmagicslots");
  }

  // Parse out class features
  parseSpellsAndPowers(powers, model);

  console.log(model);

  const allPowers = getPowers(powers);

  let prevGroup = "NONE";
  let curGroup = "";
  allPowers.forEach((power) => {
    curGroup = power.group;
    // Push group title
    if (prevGroup !== curGroup) {
      prevGroup = curGroup;
      allFeatures.push(`TITLE:${curGroup}`);
      allFeatures.push("TITLE:NORENDER");
    }
    // Push power
    allFeatures.push(powerToString(power));
  });

  const pages: (string | JSX.Element)[][] = [];
  // Chunk into pages
  for (let i = 0; i < allFeatures.length; i += MAX_SPELLS_LINES) {
    const tempArray = allFeatures.slice(i, i + MAX_SPELLS_LINES);
    pages.push(tempArray);
  }

  return (
    <>
      {pages.map((page, index) => {
        //const groups: string[][] = [[]];
        const groups: PowerGroup[] = [new PowerGroup()];
        let curIndex = 0;
        // Split into groups
        for (let i = 0; i < page.length; i += 1) {
          const line = page[i];
          if (
            i !== 0 &&
            typeof line === "string" &&
            line.indexOf("TITLE") === 0 &&
            line.indexOf("NORENDER") === -1
          ) {
            // New group
            groups.push(new PowerGroup());
            curIndex += 1;
          }
          groups[curIndex].actions.push(line);
        }
        // console.log(groups)

        return (
          <Page key={`logs-${index}`}>
            <div className="characterContainer">
              <CharacterHeader character={character} />
              {groups.map((group, gindex) => {
                return (
                  <div className="listSection" key={`logsgroup-${gindex}`}>
                    {group.actions.map((action, sindex) => {
                      if (typeof action === "string") {
                        const isHeader = action.indexOf("TITLE:") === 0;
                        if (isHeader) {
                          if (action.indexOf("NORENDER") === -1) {
                            return (
                              <div
                                className="listLabel"
                                key={`logsstring-${gindex}${sindex}`}
                              >
                                {action.split("TITLE:")[1]}
                              </div>
                            );
                          } else {
                            return null;
                          }
                        } else {
                          return (
                            <div
                              className="listLine"
                              key={`logsstring-${gindex}${sindex}`}
                            >
                              {action}
                            </div>
                          );
                        }
                      } else {
                        <div
                          className="listLine"
                          key={`logsstring-${gindex}${sindex}`}
                        >
                          {action}
                        </div>
                      }
                    })}
                  </div>
                );
              })}
            </div>
          </Page>
        );
      })}
    </>
  );
};

export default Actions;
