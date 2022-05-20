/*
 *  class LogObjectContainerSource
 */
import jQuery from "jquery";
import { LogObjectProcessor } from 'log-object-processor';
import DataSource from './DataSource';
export default class LogObjectContainerSource {
    LogObjectProcessor: LogObjectProcessor;
    dataSource: DataSource;
    constructor( logObjectProcessorArg: LogObjectProcessor ) {
        this.LogObjectProcessor = logObjectProcessorArg;
        this.dataSource = new DataSource();
    }

    refresh( object_view_id: string ) {
        console.log( "refreshing log object container..." );
        jQuery( document ).on( "consumeData", this.consumeData );
        var args = {
            query: "select object_data from monitored_objects where object_view_id ='" + object_view_id + "'",
            trigger: "consumeData",
            thisObject: this }
        
        this.dataSource.runQuery( args );
    }

    consumeData( _event, result ) {
        console.table( result.data[ 0 ] );
        let object_data = JSON.parse( result.data[ 0 ][ 0 ] );
        let logObjects = object_data.logObjects;
        this.LogObjectProcessor.updateQue( logObjects );
    }

}
