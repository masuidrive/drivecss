#
# Ruby License - Keiji Yoshimi
# http://d.hatena.ne.jp/walf443/20070301/1172762706
require File.join(File.dirname(__FILE__), 'observer')

class Pathname
  class ObserveManager
    include Observable

    def initialize glob_expr=nil, interval=1, &block
      @interval = interval

      if glob_expr
        add_paths glob_expr, &block
      end
    end

    attr_accessor :interval

    def add_paths glob_expr, &block
      Pathname.glob(glob_expr).each do |pathname|
        add_observer(Pathname::Observer.new(pathname, &block))
      end
    end

    def observe method
      last_result_of = {}
      @observer_peers.each do |observer|
        last_result_of[observer.path.to_s] = observer.path.__send__(method)
      end
      loop do
        begin
          sleep @interval

          current_result_of = {} 
          @observer_peers.each do |observer|
            current_result_of[observer.path.to_s] = observer.path.__send__(method)
          end

          if (temp_touple = current_result_of.select {|key,val| val != last_result_of[key]}).size > 0
            temp_touple.each do |hash|
              changed
              notify_observers(hash.first, hash.last)
            end
            last_result_of = current_result_of
          end
        rescue Interrupt
          return
        rescue Exception
          next
        end
      end
    end
  end
end

if $PROGRAM_NAME == __FILE__
  observe_manager = Pathname::ObserveManager.new('*.txt') {|path, result| puts "#{path} updated on #{result}" }
  observe_manager.observe(:mtime)
end

