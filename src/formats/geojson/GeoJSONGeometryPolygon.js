/*
 * Copyright (C) 2014 United States Government as represented by the Administrator of the
 * National Aeronautics and Space Administration. All Rights Reserved.
 */
/**
 * @exports GeoJSONGeometryPolygon
 */
define(['../../error/ArgumentError',
        './GeoJSONGeometry',
        '../../util/Logger'
    ],
    function (ArgumentError,
              GeoJSONGeometry,
              Logger) {
        "use strict";

        /**
         * Constructs a GeoJSON geometry for a Polygon. Applications typically do not call this constructor.
         * It is called by {@link GeoJSON} as GeoJSON geometries are read.
         * @alias GeoJSONGeometryPolygon
         * @constructor
         * @classdesc Contains the data associated with a GeoJSON Polygon geometry.
         * @augments GeoJSONGeometry
         * @param {Number[]} coordinates The array containing Polygon coordinates.
         * @param {String} type A string containing type of geometry.
         * @param {Object} bbox An object containing GeoJSON bbox information.
         * @throws {ArgumentError} If the specified coordinates or type are null or undefined or if the
         * coordinates parameter is not an array of LinearRing coordinate arrays.
         */
        var GeoJSONGeometryPolygon = function (coordinates, type, bbox) {

            if (!coordinates) {
                throw new ArgumentError(
                    Logger.logMessage(Logger.LEVEL_SEVERE, "GeoJSONGeometryPolygon", "constructor",
                        "missingCoordinates"));
            }

            if (coordinates[0].length < 2 || coordinates[0][0].length < 2) {
                throw new ArgumentError(
                    Logger.logMessage(Logger.LEVEL_SEVERE, "GeoJSONGeometryPolygon", "constructor",
                        "invalidNumberOfCoordinates"));
            }

            if (Object.prototype.toString.call(coordinates[0]) !== '[object Array]' ||
                Object.prototype.toString.call(coordinates[0][0]) !== '[object Array]' ||
                Object.prototype.toString.call(coordinates[0][0][0]) !== '[object Number]') {
                throw new ArgumentError(
                    Logger.logMessage(Logger.LEVEL_SEVERE, "GeoJSONGeometryPolygon", "constructor",
                        "invalidCoordinatesType"));
            }

            for (var i = 0; i < coordinates.length; i++) {
                if (coordinates[i][0][0] !== coordinates[i][coordinates[0].length - 1][0] ||
                    coordinates[i][0][1] !== coordinates[i][coordinates[0].length - 1][1]) {
                    throw new ArgumentError(
                        Logger.logMessage(Logger.LEVEL_SEVERE, "GeoJSONGeometryPolygon", "constructor",
                            "invalidLinearRing"));
                }
            }

            if (!type) {
                throw new ArgumentError(
                    Logger.logMessage(Logger.LEVEL_SEVERE, "GeoJSONGeometryPolygon", "constructor",
                        "missingType"));
            }

            GeoJSONGeometry.call(this, coordinates, type, bbox);
        };

        GeoJSONGeometryPolygon.prototype = Object.create(GeoJSONGeometry.prototype);

        return GeoJSONGeometryPolygon;
    }
);
