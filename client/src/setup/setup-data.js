import { abbreviate } from "../shared/abbreviation/abbreviator";
import { camelCase, pascalCase } from "change-case";

class SetupTeam {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}

class SetupWeather {
  constructor(id, description) {
    this.id = id;
    this.description = description;
  }
}

class SetupTrack {
  constructor(id, description) {
    this.id = id;
    this.description = description;
  }
}

class SetupGroup {
  constructor(id, description, fields) {
    this.id = id;
    this.description = description;
    this.fields = fields;
  }
}

class SetupField {
  constructor(id, description, abbreviation, group) {
    this.id = id;
    this.description = description;
    this.abbreviation = abbreviation;
    this.group = group;
  }
}

function generateSetupGroup(description, fields) {
  const id = camelCase(description);
  const group = new SetupGroup(id, description, fields);
  group.fields.forEach(field => (field.group = group));
  return group;
}

function generateSetupField(description, abbreviation) {
  const id = camelCase(description);
  const abbr = abbreviation || abbreviate(description);
  return new SetupField(id, description, abbr);
}

export const setupMetadata = [
  generateSetupGroup("Aerodynamics", [
    generateSetupField("Front Wing Aero"),
    generateSetupField("Rear Wing Aero")
  ]),
  generateSetupGroup("Transmission", [
    generateSetupField("Differential Adjustments On Throttle", "DAONT"),
    generateSetupField("Differential Adjustments Off Throttle", "DAOFT")
  ]),
  generateSetupGroup("Suspension Geometry", [
    generateSetupField("Front Camber"),
    generateSetupField("Rear Camber"),
    generateSetupField("Front Toe"),
    generateSetupField("Rear Toe")
  ]),
  generateSetupGroup("Suspension", [
    generateSetupField("Front Suspension"),
    generateSetupField("Rear Suspension"),
    generateSetupField("Front Anti Roll Bar"),
    generateSetupField("Rear Anti Roll Bar"),
    generateSetupField("Front Ride Height"),
    generateSetupField("Rear Ride Height")
  ]),
  generateSetupGroup("Brakes", [
    generateSetupField("Brake Pressure"),
    generateSetupField("Front Brake Bias")
  ]),
  generateSetupGroup("Tyres", [
    generateSetupField("Front Tyre Pressure"),
    generateSetupField("Rear Tyre Pressure")
  ]),
  generateSetupGroup("Weight Distribution", [generateSetupField("Ballast")])
];

function basicData(name, team, track, weather, time) {
  return {
    name,
    team,
    track,
    weather,
    time
  };
}

function aerodynamics(aerodynamicsFrontWingAero, aerodynamicsRearWingAero) {
  return { aerodynamicsFrontWingAero, aerodynamicsRearWingAero };
}

function transmission(
  transmissionDifferentialAdjustmentsOnThrottle,
  transmissionDifferentialAdjustmentsOffThrottle
) {
  return {
    transmissionDifferentialAdjustmentsOnThrottle,
    transmissionDifferentialAdjustmentsOffThrottle
  };
}

function suspenssionGeometry(
  suspensionGeometryFrontCamber,
  suspensionGeometryRearCamber,
  suspensionGeometryFrontToe,
  suspensionGeometryRearToe
) {
  return {
    suspensionGeometryFrontCamber,
    suspensionGeometryRearCamber,
    suspensionGeometryFrontToe,
    suspensionGeometryRearToe
  };
}

function suspension(
  suspensionFrontSuspension,
  suspensionRearSuspension,
  suspensionFrontAntiRollBar,
  suspensionRearAntiRollBar,
  suspensionFrontRideHeight,
  suspensionRearRideHeight
) {
  return {
    suspensionFrontSuspension,
    suspensionRearSuspension,
    suspensionFrontAntiRollBar,
    suspensionRearAntiRollBar,
    suspensionFrontRideHeight,
    suspensionRearRideHeight
  };
}

function brakes(brakesBrakePressure, brakesFrontBrakeBias) {
  return {
    brakesBrakePressure,
    brakesFrontBrakeBias
  };
}

function tyres(tyresFrontTyrePressure, tyresRearTyrePressure) {
  return {
    tyresFrontTyrePressure,
    tyresRearTyrePressure
  };
}

function weightDistribution(weightDistributionBallast) {
  return { weightDistributionBallast };
}

function mmi(min, max, inverted = false) {
  return { min, max, inverted };
}

export const setupLimits = Object.assign(
  aerodynamics(mmi(1, 11), mmi(1, 11)),
  transmission(mmi(50, 100), mmi(50, 100)),
  suspenssionGeometry(
    mmi(-3.5, -2.5),
    mmi(-2, -1),
    mmi(0.05, 0.15, true),
    mmi(0.2, 0.5)
  ),
  suspension(
    mmi(1, 11, true),
    mmi(1, 11, true),
    mmi(1, 11),
    mmi(1, 11),
    mmi(1, 11),
    mmi(1, 11)
  ),
  brakes(mmi(50, 100), mmi(50, 70, true)),
  tyres(mmi(21, 25, true), mmi(19.5, 23.5, true)),
  weightDistribution(mmi(1, 11, true))
);

export const defaultSetups = [
  Object.assign(
    { id: "DEF1", isDefault: true },
    basicData("MAXIMUM_DOWNFORCE"),
    aerodynamics(10, 11),
    transmission(75, 75),
    suspenssionGeometry(-2.6, -1.1, 0.08, 0.41),
    suspension(4, 4, 8, 8, 8, 8),
    brakes(79, 58),
    tyres(22.2, 20.7),
    weightDistribution(4)
  ),
  Object.assign(
    { id: "DEF2", isDefault: true },
    basicData("INCREASED_DOWNFORCE"),
    aerodynamics(8, 9),
    transmission(75, 75),
    suspenssionGeometry(-2.8, -1.3, 0.09, 0.38),
    suspension(5, 5, 7, 7, 7, 7),
    brakes(77, 59),
    tyres(22.6, 21.1),
    weightDistribution(5)
  ),
  Object.assign(
    { id: "DEF3", isDefault: true },
    basicData("BALANCED_DEFAULT"),
    aerodynamics(6, 6),
    transmission(75, 75),
    suspenssionGeometry(-3.0, -1.5, 0.1, 0.35),
    suspension(6, 6, 6, 6, 6, 6),
    brakes(75, 60),
    tyres(23.0, 21.5),
    weightDistribution(6)
  ),
  Object.assign(
    { id: "DEF4", isDefault: true },
    basicData("INCREASED_TOP_SPEED"),
    aerodynamics(4, 4),
    transmission(75, 75),
    suspenssionGeometry(-3.2, -1.7, 0.11, 0.35),
    suspension(7, 7, 5, 5, 5, 5),
    brakes(73, 61),
    tyres(23.4, 21.9),
    weightDistribution(7)
  ),
  Object.assign(
    { id: "DEF5", isDefault: true },
    basicData("MAXIMUM_TOP_SPEED"),
    aerodynamics(2, 2),
    transmission(75, 75),
    suspenssionGeometry(-3.4, -1.9, 0.12, 0.32),
    suspension(8, 8, 4, 4, 4, 4),
    brakes(71, 62),
    tyres(23.8, 22.3),
    weightDistribution(8)
  )
];

export const setupTeams = [
  new SetupTeam("mercedes", "Mercedes", "Mercedes-AMG Petronas Motorsport"),
  new SetupTeam("ferrari", "Ferrari", "Scuderia Ferrari"),
  new SetupTeam("red-bull", "Red Bull", "Aston Martin Red Bull Racing"),
  new SetupTeam(
    "force-india",
    "Force India",
    "Sahara Force India Formula One Team"
  ),
  new SetupTeam("williams", "Williams", "Williams Racing"),
  new SetupTeam("renault", "Renault", "Renault Sport Formula One Team"),
  new SetupTeam("toro-rosso", "Toro Rosso", "Red Bull Toro Rosso Honda"),
  new SetupTeam("haas", "Haas", "Haas F1 Team"),
  new SetupTeam("mclaren", "McLaren", "McLaren F1 Team"),
  new SetupTeam("sauber", "Sauber", "Alfa Romeo Sauber F1 Team")
];

export const setupWeathers = [
  new SetupWeather("dry", "Dry"),
  new SetupWeather("wet", "Wet")
];

export const setupTracks = [
  new SetupTrack("australia", "Australia"),
  new SetupTrack("bahrain", "Bahrain"),
  new SetupTrack("bahrain-short", "Bahrain Short"),
  new SetupTrack("china", "China"),
  new SetupTrack("azerbaijan", "Azerbaijan"),
  new SetupTrack("spain", "Spain"),
  new SetupTrack("monaco", "Monaco"),
  new SetupTrack("canada", "Canada"),
  new SetupTrack("france", "France"),
  new SetupTrack("austria", "Austria"),
  new SetupTrack("britain", "Britain"),
  new SetupTrack("britain-short", "Britain Short"),
  new SetupTrack("germany", "Germany"),
  new SetupTrack("hungary", "Hungary"),
  new SetupTrack("belgium", "Belgium"),
  new SetupTrack("italy", "Italy"),
  new SetupTrack("singapore", "Singapore"),
  new SetupTrack("russia", "Russia"),
  new SetupTrack("japan", "Japan"),
  new SetupTrack("japan-short", "Japan Short"),
  new SetupTrack("usa", "USA"),
  new SetupTrack("mexico", "México"),
  new SetupTrack("brazil", "Brazil")
];

function filterAnyById(list) {
  return function(id) {
    if (!id) {
      return { description: "Any", name: "Any" };
    } else {
      const filtered = list.filter(item => item.id === id);
      if (filtered.length > 0) {
        return filtered[0];
      } else {
        return { description: "Not found", name: "Not found" };
      }
    }
  };
}

export const generateFieldName = (group, field) =>
  `${camelCase(group.id)}${pascalCase(field.id)}`;
export const findSetupTeamById = filterAnyById(setupTeams);
export const findSetupTrackById = filterAnyById(setupTracks);
export const findSetupWeatherById = filterAnyById(setupWeathers);
