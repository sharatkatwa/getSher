import bcrypt from "bcrypt";
import mongoose from "mongoose";
import dns from 'dns'

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

import env from "../src/config/env.js";
import {
  MATCH_STATUS,
  PLAYER_ROLES,
  ROLES,
  SERIES_STATUS,
} from "../src/constants/model.constant.js";
import Commentary, { COMMENTARY_TYPES } from "../src/model/commentary.model.js";
import Match from "../src/model/match.model.js";
import playerModel from "../src/model/player.model.js";
import Score from "../src/model/score.model.js";
import seriesModel from "../src/model/series.model.js";
import teamModel from "../src/model/team.model.js";
import userModel from "../src/model/user.model.js";

const imageUrl = "https://placehold.co/400x400/png";

const indiaPlayers = [
  [
    "Rohit Sharma",
    PLAYER_ROLES.BATSMAN,
    "Right-hand bat",
    "Right-arm offbreak",
  ],
  ["Yashasvi Jaiswal", PLAYER_ROLES.BATSMAN, "Left-hand bat", "Legbreak"],
  [
    "Shubman Gill",
    PLAYER_ROLES.BATSMAN,
    "Right-hand bat",
    "Right-arm offbreak",
  ],
  ["Virat Kohli", PLAYER_ROLES.BATSMAN, "Right-hand bat", "Right-arm medium"],
  ["KL Rahul", PLAYER_ROLES.WICKET_KEEPER, "Right-hand bat", ""],
  [
    "Ravindra Jadeja",
    PLAYER_ROLES.ALL_ROUNDER,
    "Left-hand bat",
    "Left-arm orthodox",
  ],
  [
    "Ravichandran Ashwin",
    PLAYER_ROLES.ALL_ROUNDER,
    "Right-hand bat",
    "Right-arm offbreak",
  ],
  ["Jasprit Bumrah", PLAYER_ROLES.BOWLER, "Right-hand bat", "Right-arm fast"],
  ["Mohammed Siraj", PLAYER_ROLES.BOWLER, "Right-hand bat", "Right-arm fast"],
  [
    "Kuldeep Yadav",
    PLAYER_ROLES.BOWLER,
    "Left-hand bat",
    "Left-arm wrist spin",
  ],
  ["Mohammed Shami", PLAYER_ROLES.BOWLER, "Right-hand bat", "Right-arm fast"],
];

const australiaPlayers = [
  ["Usman Khawaja", PLAYER_ROLES.BATSMAN, "Left-hand bat", "Right-arm medium"],
  ["David Warner", PLAYER_ROLES.BATSMAN, "Left-hand bat", "Legbreak"],
  ["Marnus Labuschagne", PLAYER_ROLES.BATSMAN, "Right-hand bat", "Legbreak"],
  ["Steve Smith", PLAYER_ROLES.BATSMAN, "Right-hand bat", "Legbreak"],
  ["Travis Head", PLAYER_ROLES.BATSMAN, "Left-hand bat", "Right-arm offbreak"],
  ["Alex Carey", PLAYER_ROLES.WICKET_KEEPER, "Left-hand bat", ""],
  [
    "Cameron Green",
    PLAYER_ROLES.ALL_ROUNDER,
    "Right-hand bat",
    "Right-arm fast medium",
  ],
  ["Pat Cummins", PLAYER_ROLES.BOWLER, "Right-hand bat", "Right-arm fast"],
  ["Mitchell Starc", PLAYER_ROLES.BOWLER, "Left-hand bat", "Left-arm fast"],
  ["Nathan Lyon", PLAYER_ROLES.BOWLER, "Right-hand bat", "Right-arm offbreak"],
  [
    "Josh Hazlewood",
    PLAYER_ROLES.BOWLER,
    "Left-hand bat",
    "Right-arm fast medium",
  ],
];

const buildPlayers = (players, country, userId) =>
  players.map(([name, role, battingStyle, bowlingStyle]) => ({
    name,
    role,
    country,
    battingStyle,
    bowlingStyle,
    imageUrl,
    createdBy: userId,
    updatedBy: userId,
  }));

const buildPlayingXI = (players, captainName, wicketKeeperName) =>
  players.map((player) => ({
    player: player._id,
    isCaptain: player.name === captainName,
    isWicketKeeper: player.name === wicketKeeperName,
  }));

const clearDatabase = async () => {
  await Promise.all([
    Commentary.deleteMany({}),
    Score.deleteMany({}),
    Match.deleteMany({}),
    teamModel.deleteMany({}),
    playerModel.deleteMany({}),
    seriesModel.deleteMany({}),
    userModel.deleteMany({}),
  ]);
};

const seedDatabase = async () => {
  await mongoose.connect(env.MONGO_URI);
  console.log("MongoDB connected for seeding");

  await clearDatabase();
  console.log("Existing seed data cleared");

  const hashedPassword = await bcrypt.hash("Password@123", 10);

  const [superAdmin, scorer] = await userModel.create([
    {
      name: "Super Admin",
      email: "superadmin@getsher.com",
      password: hashedPassword,
      role: ROLES.SUPER_ADMIN,
    },
    {
      name: "Match Scorer",
      email: "scorer@getsher.com",
      password: hashedPassword,
      role: ROLES.SCORER,
    },
  ]);

  const series = await seriesModel.create({
    name: "Border-Gavaskar Trophy",
    shortName: "BGT",
    season: "2026",
    status: SERIES_STATUS.LIVE,
    logo: imageUrl,
    createdBy: superAdmin._id,
    updatedBy: superAdmin._id,
  });

  const createdIndiaPlayers = await playerModel.insertMany(
    buildPlayers(indiaPlayers, "India", superAdmin._id),
  );
  const createdAustraliaPlayers = await playerModel.insertMany(
    buildPlayers(australiaPlayers, "Australia", superAdmin._id),
  );

  const [india, australia] = await teamModel.create([
    {
      name: "India",
      shortName: "IND",
      logo: imageUrl,
      primaryColor: "#0B3D91",
      squadPlayers: createdIndiaPlayers.map((player) => player._id),
      createdBy: superAdmin._id,
      updatedBy: superAdmin._id,
    },
    {
      name: "Australia",
      shortName: "AUS",
      logo: imageUrl,
      primaryColor: "#154734",
      squadPlayers: createdAustraliaPlayers.map((player) => player._id),
      createdBy: superAdmin._id,
      updatedBy: superAdmin._id,
    },
  ]);

  const match = await Match.create({
    seriesId: series._id,
    matchNumber: "1st Test",
    venue: "Melbourne Cricket Ground, Melbourne",
    startTime: new Date(),
    status: MATCH_STATUS.LIVE,
    team1: india._id,
    team2: australia._id,
    tossWinner: australia._id,
    tossDecision: "BOWL",
    playingXI: {
      team1: buildPlayingXI(createdIndiaPlayers, "Rohit Sharma", "KL Rahul"),
      team2: buildPlayingXI(
        createdAustraliaPlayers,
        "Pat Cummins",
        "Alex Carey",
      ),
    },
    createdBy: superAdmin._id,
    updatedBy: scorer._id,
  });

  await Score.create([
    {
      matchId: match._id,
      innings: 1,
      battingTeam: india._id,
      score: 342,
      wickets: 8,
      overs: "90.0",
      runRate: 3.8,
      createdBy: scorer._id,
      updatedBy: scorer._id,
    },
    {
      matchId: match._id,
      innings: 2,
      battingTeam: australia._id,
      score: 0,
      wickets: 0,
      overs: "0.0",
      runRate: 0,
      target: 343,
      createdBy: scorer._id,
      updatedBy: scorer._id,
    },
  ]);

  await Commentary.create([
    {
      matchId: match._id,
      over: 90,
      ball: 6,
      text: "OUT! Kohli edges behind after a masterful 84.",
      type: COMMENTARY_TYPES.WICKET,
      createdBy: scorer._id,
    },
    {
      matchId: match._id,
      over: 89,
      ball: 4,
      text: "FOUR! Elegant cover drive through the gap.",
      type: COMMENTARY_TYPES.FOUR,
      createdBy: scorer._id,
    },
    {
      matchId: match._id,
      over: 89,
      ball: 3,
      text: "Good length delivery outside off, defended towards point.",
      type: COMMENTARY_TYPES.NORMAL,
      createdBy: scorer._id,
    },
  ]);

  console.log("Seed completed successfully");
  console.log("Login users:");
  console.log("SUPER_ADMIN: superadmin@getsher.com / Password@123");
  console.log("SCORER: scorer@getsher.com / Password@123");
};

seedDatabase()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
