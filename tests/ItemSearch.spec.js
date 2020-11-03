/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import ClientsList from '../src/components/ClientsList.vue'
import axios from 'axios'

jest.mock('axios')

let wrapper = null;

beforeEach(() => (wrapper = shallowMount(ClientsList)))
afterEach(() => wrapper.destroy())

describe('ClientsList', () => {
    test('should fetch users', () => {
        const clients = [{first_name: 'Davida'}];
        const resp = {data: clients};
        axios.get.mockResolvedValue(resp);

        return ClientsList.retrieveclients().then(data => expect(data).toEqual(clients));
    });
})
