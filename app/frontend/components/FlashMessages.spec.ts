import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import FlashMessages from './FlashMessages.vue'

describe('FlashMessages', () => {
  it('renders nothing without flash data', () => {
    const wrapper = mount(FlashMessages, { props: { flash: {} } })

    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  })

  it('renders notice and alert messages', () => {
    const wrapper = mount(FlashMessages, { props: { flash: { notice: 'Saved', alert: 'Careful' } } })

    expect(wrapper.get('[data-testid="flash-notice"]').text()).toBe('Saved')
    expect(wrapper.get('[data-testid="flash-alert"]').text()).toBe('Careful')
  })

  it('can be dismissed and reappears on new flash data', async () => {
    const wrapper = mount(FlashMessages, { props: { flash: { notice: 'Saved' } } })

    await wrapper.get('button').trigger('click')
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)

    await wrapper.setProps({ flash: { notice: 'Updated' } })
    expect(wrapper.get('[data-testid="flash-notice"]').text()).toBe('Updated')
  })
})
