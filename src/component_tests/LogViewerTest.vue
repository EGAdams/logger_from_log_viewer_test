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
import { LogObjectProcessor /* @vite-ignore */ } from 'log-object-processor';
import { LogObjectContainer /* @vite-ignore */ } from 'log-object-processor';
import LogObjectContainerSource from '../LogObjectContainerSource';
export default defineComponent({
    name: "LogViewerTest",
    components: {
        LogViewer
    },
    data() {
        return {
            test_object_name: "tester_1",
            logObjectContainer:  new LogObjectContainer(),
            logObjectProcessor: new LogObjectProcessor( this.logObjectContainer ),
            logObjectContainerSource: new LogObjectContainerSource( this.logObjectProcessor ),
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
            setInterval( function(){
                this.logObjectContainerSource.refresh( "MessageManager_1523" );
                this.logObjectProcessor.processLogObjects();
            }.bind( this ), 1000 );
        },
    },
});
</script>

<style scoped></style>
