<!-- Log Viewer component test -->
<template>
  <!-- the v-html xlates raw html -->
  <log-viewer
    v-bind:object_name="test_object_name"
    v-bind:logs="logs"></log-viewer>
  <button @click="startTest">Start Test</button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { LogViewer } from "@egadams/vue3-plugin";
import { LogObjectContainerSource } from 'log-object-processor';
import jQuery from 'jquery';
export default defineComponent({
    name: "LogViewerTest",
    components: {
        LogViewer
    },
    data() {
        return {
            log_count: 0,
            test_object_name: "tester_1",
            logObjectContainerSource: new LogObjectContainerSource(),
            logs: [{
                    id: "1",
                    timestamp: 100,
                    message: "test message 1",
                    method: "test",
            }, {
                    id: "2",
                    timestamp: 100,
                    message: "test message 2",
                    method: "test",
            }, {
                    id: "3",
                    timestamp: 100,
                    message: "test message 3",
                    method: "test",
            }],
        };
    },
    methods: {
        startTest() {
            setInterval( () =>{
                this.logObjectContainerSource.refresh( "MessageManager_1523" );
                this.logs = this.logObjectContainerSource.logObjectProcessor.getWrittenLogs();
                if ( this.log_count != this.logs.length ) {
                    jQuery( "#tester_1_log_viewer" ).animate(
                            { scrollTop: jQuery( "#tester_1_log_viewer" ).prop( "scrollHeight" ) * 2 },
                            500 );
                    this.log_count = this.logs.length;
                }
            }, 1000 );
        },
    },
});
</script>

<style scoped></style>
