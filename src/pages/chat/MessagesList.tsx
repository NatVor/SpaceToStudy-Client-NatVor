import { useCallback, useLayoutEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import SimpleBar from 'simplebar-react'
import { useTranslation } from 'react-i18next'

import { styles } from '~/pages/chat/Chat.styles'

import ChatDate from '~/containers/chat/chat-date/ChatDate'
import Message from '~/components/message/Message'
import TypingBlock from '~/components/typing-block/TypingBlock'
import AppChip from '~/components/app-chip/AppChip'
import { useAppSelector } from '~/hooks/use-redux'
import { selectIsTyping } from '~/redux/selectors/socket-selectors'
import { Member, MessageInterface } from '~/types'
import { getGroupedByDate, getIsNewDay } from '~/utils/helper-functions'

interface MessagesListProps {
  messages: MessageInterface[]
  filteredMessages: string[]
  filteredIndex: number
  isMessagesLoading: boolean
  scrollTop: number
  scrollHeight: number
  infiniteLoadCallback: (scrollTop: number, scrollHeight: number) => void
  chatId: string
  userToSpeak: Member
}

const MessagesList = ({
  messages,
  filteredMessages,
  filteredIndex,
  isMessagesLoading,
  infiniteLoadCallback,
  scrollTop,
  scrollHeight,
  chatId,
  userToSpeak
}: MessagesListProps) => {
  const { t } = useTranslation()
  const observer = useRef<IntersectionObserver>()
  const scrollRef = useRef<HTMLDivElement>()
  const isTyping = useAppSelector(selectIsTyping(chatId))

  useLayoutEffect(() => {
    if (!scrollRef.current) return
    const newHeight = scrollRef.current.scrollHeight
    scrollRef.current.scrollTop = scrollTop + (newHeight - scrollHeight)
  }, [messages.length, scrollHeight, scrollTop])

  const oldestMessageElementRef = useCallback(
    (element: HTMLDivElement) => {
      if (isMessagesLoading) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && scrollRef.current) {
            infiniteLoadCallback(
              scrollRef.current.scrollTop,
              scrollRef.current.scrollHeight
            )
          }
        },
        { threshold: 1 }
      )

      if (element) observer.current.observe(element)
    },
    [isMessagesLoading, infiniteLoadCallback]
  )

  if (messages.length === 0) {
    return (
      <Box sx={styles.chipWrapper}>
        <AppChip labelSx={styles.chipLabel(true)} sx={styles.chip}>
          {t('chatPage.message.noMessages')}
        </AppChip>
      </Box>
    )
  }

  const groupedMessages = getGroupedByDate(messages, getIsNewDay)
  const messagesListWithDate = groupedMessages.map((group, groupIndex) => (
    <Box key={group.date} sx={styles.messagesWithDate(groupIndex)}>
      <ChatDate date={group.date} />
      {group.items.map((item, messageIndex) => {
        if (messageIndex === 0 && groupIndex === 0) {
          return (
            <Box key={item._id} ref={oldestMessageElementRef}>
              <Message
                filteredIndex={filteredIndex}
                filteredMessages={filteredMessages}
                message={item}
                prevMessage={
                  messageIndex ? group.items[messageIndex - 1] : null
                }
              />
            </Box>
          )
        }
        return (
          <Message
            filteredIndex={filteredIndex}
            filteredMessages={filteredMessages}
            key={item._id}
            message={item}
            prevMessage={messageIndex ? group.items[messageIndex - 1] : null}
          />
        )
      })}
    </Box>
  ))

  return (
    <SimpleBar
      data-testid='scrollable-content'
      scrollableNodeProps={{ ref: scrollRef }}
      style={styles.scrollableContent}
    >
      {messagesListWithDate}
      {isTyping && <TypingBlock userToSpeak={userToSpeak} />}
    </SimpleBar>
  )
}

export default MessagesList
