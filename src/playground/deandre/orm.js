import { Sequelize, DataTypes } from 'sequelize';
import fs from 'fs';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './src/playground/deandre/database.sqlite'
});

export const Pokemon = sequelize.define('Pokemon', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    type: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export const Team = sequelize.define('Team', {
    userId: {
        type: DataTypes.STRING,
        primaryKey: true
    }
});

export const TeamPokemon = sequelize.define('TeamPokemon', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },

    pokemonId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    slot: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Pokemon.hasMany(TeamPokemon, {
    foreignKey: 'pokemonId'
});

TeamPokemon.belongsTo(Pokemon, {
    foreignKey: 'pokemonId'
});

await sequelize.authenticate();

console.log('Connection has been established successfully.');

await sequelize.sync();

const pokemonData = JSON.parse(
    fs.readFileSync(
        './src/routes/deandre/pokemon.json',
        'utf-8'
    )
);

const pokemonCount = await Pokemon.count();

if (pokemonCount === 0) {
    await Pokemon.bulkCreate(pokemonData);

    console.log('Pokemon data has been inserted into the database.');
}