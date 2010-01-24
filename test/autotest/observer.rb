#
# Ruby License - Keiji Yoshimi
# http://d.hatena.ne.jp/walf443/20070301/1172762706
require 'pathname'
require 'observer'

require File.expand_path(File.join(File.dirname(__FILE__), 'observe_manager'))

class Pathname
  class Observer
    def initialize(path, &block) 
      @path = Pathname.new(path) 
      unless @path.exist?
        raise ArgumentError
      end

      @proc = block
    end

    def path
      @path
    end

    def update path, result
      if @path.to_s == path.to_s 
        @proc.call(@path.to_s, result)
      end
    end
  end
end

